import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: "",
};
export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCategories, setError, setLoading } = categories.actions;

export default categories.reducer;

export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = await getState();
  dispatch(setLoading(true));
  try {
    if (categories.categories.length == 0) {
      const res = await fetch("/api/categories/list");
      const data = await res.json();
      dispatch(getCategories(data));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
