import AdminSlice from "@/redux/adminState/adminSlice";
import orderSlice from "@/redux/order/orderSlice";
import ProductSlice from "@/redux/product/ProductSlice";
import userSlice from "@/redux/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    productItem: ProductSlice,
    user: userSlice,
    orderDetail: orderSlice,
    dashboard: AdminSlice,
  },
});
