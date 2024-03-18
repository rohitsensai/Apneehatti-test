import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  total: 0,
  shipping: 0,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCart: (state, action) => {
      console.log({ action }, action.payload.total);
      state.cartItems = [...action.payload.savedcart];
      state.shipping = action.payload.shipping;
      state.subtotal = action.payload.subtotal;
      state.total = action.payload.total;
    },
    addToCart: (state, action) => {
      const checkItemExist = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.savedcart.item.product._id
      );
      if (checkItemExist === -1) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        state.cartItems[checkItemExist].quantity++;
      }
    },
    removeFromCart: (state, action) => {
      const cart = state.cartItems.filter((item) => item.id !== action.payload);
      return { ...state, cartItems: cart };
    },
    clearCart: (state, action) => {
      return { ...state, cartItems: [], subtotal: 0, total: 0, shipping: 0 };
    },
    decQuantity: (state, action) => {
      const checkItemExist = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (checkItemExist !== -1) {
        if (state.cartItems[checkItemExist].quantity > 1) {
          state.cartItems[checkItemExist].quantity--;
        }
      }
    },
    incQuantity: (state, action) => {
      const checkItemExist = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (checkItemExist !== -1) {
        state.cartItems[checkItemExist].quantity++;
      }
    },
    productQuantity: (state, action) => {
      const checkItemExist = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (checkItemExist !== -1) {
        state.cartItems[checkItemExist].quantity = action.payload.qty;
      }
    },
    cartTotal: (state, action) => {
      if (state.cartItems) {
        let { total } = state.cartItems.reduce(
          (acc, curVal) => {
            let { quantity, price } = curVal.product;
            price = parseInt(price);
            let updatedTotal = (price *= quantity);
            acc.total += updatedTotal;
            return acc;
          },
          { total: 0 }
        );
        return { ...state, total };
      } else {
        return { ...state, total: 0, cartItems: [] };
      }
    },
    resetCart: (state, action) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  productQuantity,
  cartTotal,
  resetCart,
  decQuantity,
  incQuantity,
  clearCart,
  initialCart,
} = cart.actions;

export default cart.reducer;
