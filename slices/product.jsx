import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';

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

export const fetchProductData = () => async (dispatch) => {
  try {
    dispatch(productSlice.actions.setLoading(true));
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
  const response = await axiosInstance.post('/products', data);
  if (response.data.status) {
    dispatch(fetchProductData());
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
    dispatch(productSlice.actions.setLoading(true));
    const response = await axiosInstance.put(`/products/${id}`, data);
    if (response.data.status) {
      dispatch(fetchProductData());
    }
    dispatch(productSlice.actions.setLoading(false));
    return true;
  }catch (err) {
      dispatch(productSlice.actions.updateProduct([]));
      dispatch(productSlice.actions.setLoading(false));
      return false;
    }
  }

export default productSlice.reducer