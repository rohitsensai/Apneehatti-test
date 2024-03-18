import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import categoriesReducer from "../slices/categories";
import cartReducer from "../slices/cart";
import productReducer from "../slices/product";

const reducers = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  products: productReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
