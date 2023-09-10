import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrder: null,
  clientOrderSecret: null,
  orderStatus: "",
  ordersId: "",
};

export const OrderSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    addUserOrderDetail: (state, action) => {
      state.userOrder = action.payload;
    },
    removeUserOrderDetail: (state, action) => {
      state.userOrder = null;
    },
    SetClientOrderSecretKey: (state, action) => {
      state.clientOrderSecret = action.payload;
    },
    SetOrderStatus: (state, action) => {
      state.orderStatus = "success";
    },
    SetOrderId: (state, action) => {
      state.ordersId = action.payload;
    },
  },
});

export const {
  addUserOrderDetail,
  removeUserOrderDetail,
  SetClientOrderSecretKey,
  SetOrderStatus,
  SetOrderId,
} = OrderSlice.actions;

export default OrderSlice.reducer;
