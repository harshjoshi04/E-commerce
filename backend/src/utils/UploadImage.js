import { v2 as cloudinary } from "cloudinary";

const uploadImage = (image, id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { public_id: id },
      function (err, result) {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        return reject(err);
      }
    );
  });
};

export default uploadImage;
