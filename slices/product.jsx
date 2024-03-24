import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateProduct(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateProduct } = productSlice.actions

export const fetchProductData = (load = true) => async (dispatch) => {
  try {
    if (load) {
      dispatch(productSlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/products');
    dispatch(productSlice.actions.updateProduct(response.data.data));
    dispatch(productSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(productSlice.actions.updateProduct([]));
    dispatch(productSlice.actions.setLoading(false));
    return false;
  }
}

export const createProductData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/products', data);
    if (response.data.status) {
      dispatch(fetchProductData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deleteProductData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  if (response.data.status) {
    dispatch(fetchProductData());
  }
}

export const updateProductData = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, data);
    if (response.data.status) {
      dispatch(fetchProductData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const updateStockData = (id, data) => async (dispatch) => {
  try {
    const productPriceHistory = [{
      stock: data.stock,
      price: data.price
    }]
    const response = await axiosInstance.put(`/products/${id}/stock`, {productPriceHistory});
    if (response.data.status) {
      dispatch(fetchProductData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default productSlice.reducer