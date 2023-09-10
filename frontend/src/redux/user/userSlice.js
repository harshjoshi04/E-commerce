import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DestroyCarts, RemoveCart, UpdateCart } from "./userApi";

export const UpdateCartQuantityApi = createAsyncThunk(
  "product/updatecart",
  async (type) => {
    if (
      (type.quantity != 5 && type.type == "inc") ||
      (type.quantity != 1 && type.type == "dec")
    ) {
      const res = await UpdateCart(type);
      return res.data;
    }
  }
);

export const RemoveCartApi = createAsyncThunk(
  "product/removecart",
  async (id) => {
    const res = await RemoveCart(id);
    return res;
  }
);

export const DeleteCartsApi = createAsyncThunk(
  "product/deletecartsapi",
  async (arr) => {
    let obj = {
      arr,
    };
    const res = await DestroyCarts(obj);
    return res;
  }
);
const initialState = {
  userData: null,
  productList: [],
  voiceProduct: [],
  totalPrice: 0,
  totalQuantity: 0,
  active: false,
};

export const UserDetail = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    setProduct: (state, action) => {
      state.productList = action.payload;
    },
    addToProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    totalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    totalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    increseCart: (state, action) => {
      let newArr = state.productList.map((val) => {
        if (val?.productId == action.payload && val.quantity < 5) {
          val.quantity += 1;
        }
        return val;
      });
      state.productList = newArr;
    },
    decreaseCart: (state, action) => {
      let newArr = state.productList.map((val) => {
        if (val?.productId == action.payload && val?.quantity > 1) {
          val.quantity -= 1;
        }
        return val;
      });
      state.productList = newArr;
    },
    DeleteCart: (state, action) => {
      let newArr = state.productList.filter(
        (val) => val?._id != action.payload
      );
      state.productList = newArr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateCartQuantityApi.fulfilled, (state, action) => {
        state.active = !state.active;
      })
      .addCase(RemoveCartApi.fulfilled, (state, action) => {})
      .addCase(DeleteCartsApi.fulfilled, (state, action) => {
        state.productList = [];
      });
  },
});

export const {
  addUser,
  addToProduct,
  setProduct,
  totalPrice,
  totalQuantity,
  increseCart,
  decreaseCart,
  DeleteCart,
} = UserDetail.actions;
export default UserDetail.reducer;
