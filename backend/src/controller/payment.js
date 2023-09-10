import OrderModel from "../model/OrderSchema.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import PayMentStripe from "stripe";
import easyinvoice from "easyinvoice";
import fs from "fs";
import Products from "../model/Product.js";
import createHttpError from "http-errors";

// Invoice Data

// Payment Getway
const stripe = PayMentStripe(process.env.STRIPE_SECRET);

export const PaymentStore = asyncErrorHandler(async (req, res, next) => {
  const { total } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(total) * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

export const ConfirmOrder = asyncErrorHandler(async (req, res, next) => {
  const userDetail = req.body;
  const userId = req.userId;

  const result = new OrderModel({
    userId,
    ...userDetail,
  });
  const data = await result.save();
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const PDFdata = {
    // Let's add a recipient
    client: {
      company: "E-commerce",
      address: "Shubhashnagar",
      zip: "364001",
      city: "Bhavnagar",
      country: "India",
    },

    // Now let's add our own sender details
    sender: {
      company: `${userDetail?.fname} ${userDetail?.lname}`,
      address: `${userDetail?.address}`,
      zip: `${userDetail?.pin}`,
      city: `${userDetail?.state}`,
      country: "India",
    },

    images: {
      //      Logo:
      // 1.   Use a url
      logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
    },

    // Let's add some standard invoice data, like invoice number, date and due-date
    information: {
      // Invoice number
      number: data?._id,
      // Invoice data
      date: currentDate,
      // Invoice due date
      "due-date": "31/12/" + date.getFullYear(),
    },

    // Now let's add some products! Calculations will be done automatically for you.
    products: await invoiceProduct(data?.products),

    // We will use bottomNotice to add a message of choice to the bottom of our invoice
    bottomNotice: "Kindly pay your invoice within 15 days.",

    // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
    settings: {
      currency: "IND", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
    },

    /*
        Customize enables you to provide your own templates.
        Please review the documentation for instructions and examples.
        Leave this option blank to use the default template
     */
    customize: {
      // "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    translate: {
      vat: "Tax",
    },
  };
  await easyinvoice.createInvoice(PDFdata, function (result) {
    let PDFName = `./upload/id${data?._id}.pdf`;
    fs.writeFileSync(PDFName.toString(), result.pdf, "base64");
  });

  async function invoiceProduct(products) {
    const newArr = products.map((val) => val.productId);
    const newdata = await Products.find({ _id: { $in: newArr } });
    const newProduct = products.map((val) => {
      let obj = {};
      newdata.map((item) => {
        if (item?._id == val?.productId) {
          obj = {
            quantity: val?.quantity,
            description: item?.title,
            "tax-rate": 10,
            price: item?.price,
          };
        }
      });
      return obj;
    });
    return newProduct;
  }
  const removeItem = data?.products.map((val) => val?._id);
  res.status(201).json({ removeItem, id: data?._id });
});

export const GetInvoice = (req, res, next) => {
  const { id } = req.params;
  if (id) {
    let PDFname = `./upload/id${id}.pdf`;
    res.download(PDFname);
  }
};

export const FindOrders = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const data = await OrderModel.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $unwind: "$products",
    },
  ]);
  res.status(201).send(data);
});
