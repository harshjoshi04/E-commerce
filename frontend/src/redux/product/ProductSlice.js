import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchFilterProduct } from "./ProductApi";

const limit = 6;
export const fetchAllProductApi = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct(limit);
    return response.data;
  }
);

export const fetchFilterProductApi = createAsyncThunk(
  "product/fecthFilterProduct",
  async (filter) => {
    let obj = {
      ...filter,
      limit,
    };
    const response = await fetchFilterProduct(obj);
    return response.data;
  }
);

const initialState = {
  product: [],
  showProdoct: [],
  status: "idle",

  totalPage: 1,
};

export const ProdcutAllList = createSlice({
  name: "product",
  initialState,
  reducers: {
    chagepage: (state, action) => {
      let page = action.payload;
      let startIndex = (Number(page) - 1) * limit;
      let endIndex = Number(page) * limit;
      state.showProdoct = state.product.slice(startIndex, endIndex);
    },
    AscendingSort: (state, action) => {
      let newData = state.product.sort((a, b) => a.price - b.price);
      state.product = newData;
      state.showProdoct = newData.slice(0, limit);
    },
    DescendingSort: (state, action) => {
      let newData = state.product.sort((a, b) => (a.price > b.price ? -1 : 1));
      state.product = newData;
      state.showProdoct = newData.slice(0, limit);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductApi.pending, (state) => {})
      .addCase(fetchAllProductApi.fulfilled, (state, action) => {
        let page = 1;
        let startIndex = (Number(page) - 1) * limit;
        let EndIndex = Number(page) * limit;
        state.status = "idle";
        state.product = action.payload.data;
        state.showProdoct = action.payload.data.slice(startIndex, EndIndex);
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchFilterProductApi.fulfilled, (state, action) => {
        let startIndex = (1 - 1) * limit;
        let endIndex = 1 * limit;
        state.product = action.payload.data;
        state.showProdoct = state.product.slice(startIndex, endIndex);
        state.totalPage = action.payload.totalPage;
      });
  },
});

export const selectProduct = (state) => state.productItem.product;
export const ShowProduct = (state) => state.productItem.showProdoct;
export const { chagepage, AscendingSort, DescendingSort } =
  ProdcutAllList.actions;
export default ProdcutAllList.reducer;
