import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductFromAdmin } from "./adminapi";
const limit = 7;
export const FetchProductForAdminApi = createAsyncThunk(
  "admin/fetchproductfromadmin",
  async () => {
    const res = await fetchProductFromAdmin(limit);
    return res.data;
  }
);

const initialState = {
  product: null,
  showProducts: [],
  totalPages: 0,
  productId: null,
  page: 1,
  change: 1,
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    ChangeAdminPage: (state, action) => {
      let page = action.payload;
      state.page = page;
      let startIndex = (Number(page) - 1) * limit;
      let endIndex = Number(page) * limit;
      let newArr = state.product.slice(startIndex, endIndex);
      state.showProducts = newArr;
    },

    SetProductId: (state, action) => {
      state.productId = action.payload;
    },
    SetUpdateData: (state, action) => {
      let newObj = action.payload;
      let newArr = state.product.map((val) => {
        if (val?._id === newObj?._id) {
          return newObj;
        }
        return val;
      });
      state.product = newArr;
      let startIndex = (Number(state.page) - 1) * limit;
      let endIndex = Number(state.page) * limit;
      let newVal = state.product.slice(startIndex, endIndex);
      state.showProducts = newVal;
    },
    SetDataForProduct: (state, action) => {
      state.page = 1;
      state.change++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchProductForAdminApi.fulfilled, (state, action) => {
      let startIndex = (1 - 1) * limit;
      let EndIndex = 1 * limit;
      state.product = action.payload.data;
      state.showProducts = action.payload.data.slice(startIndex, EndIndex);
      state.totalPages = action.payload.totalPage;
    });
  },
});

export const {
  ChangeAdminPage,
  SetDataForProduct,
  SetProductId,
  SetUpdateData,
} = AdminSlice.actions;
export const showAdminProducts = (state) => state.dashboard.showProducts;
export const AllProduct = (state) => state.dashboard.product();
export default AdminSlice.reducer;
