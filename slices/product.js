import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchProducts: [],
  searchList: [],
  products: [],
  newArrival: [],
  topDeals: [],
  trendingProducts: [],
  bestSellers: [],
  loading: false,
  error: "",
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    getSearchList: (state, action) => {
      state.searchList = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getNewArrival: (state, action) => {
      state.newArrival = action.payload;
    },
    getTopDeals: (state, action) => {
      state.topDeals = action.payload;
    },
    getTrendingProducts: (state, action) => {
      state.trendingProducts = action.payload;
    },
    getBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getProducts,
  getBestSellers,
  getNewArrival,
  getTopDeals,
  getTrendingProducts,
  setError,
  setLoading,
  getSearchList,
} = products.actions;

export default products.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch, getState) {
    dispatch(setLoading(true));
    const { products } = await getState();
    try {
      if (products.products.length > 0) {
        dispatch(setLoading(false));
      } else {
        const res = await fetch("/api/products/list");
        const data = await res.json();
        dispatch(getProducts(data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
      dispatch(setLoading(false));
    }
  };
}

export function fetchFeaturedProducts() {
  return async function fetchFeaturedProductsThunk(dispatch, getState) {
    dispatch(setLoading(true));
    const { products } = await getState();
    try {
      if (products.newArrival.length > 0) {
        dispatch(setLoading(false));
      } else {
        const [
          newArrivalArray,
          topDealsArray,
          trendingProductsArray,
          bestSellersArray,
        ] = await Promise.all([
          fetch(`/api/products/featured/new_arrival`).then((response) =>
            response.json()
          ),
          fetch(`/api/products/featured/top_deals`).then((response) =>
            response.json()
          ),
          fetch(`/api/products/featured/trending_products`).then((response) =>
            response.json()
          ),
          fetch(`/api/products/featured/best_sellers`).then((response) =>
            response.json()
          ),
        ]);

        dispatch(getNewArrival(newArrivalArray));
        dispatch(getTopDeals(topDealsArray));
        dispatch(getBestSellers(bestSellersArray));
        dispatch(getTrendingProducts(trendingProductsArray));
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
      dispatch(setLoading(false));
    }
  };
}

export function fetchSearch(search_keyword) {
  return async function fetchSearchThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { products } = await getState();
      let search_list = [];
      if (search_keyword) {
        search_list = products.products.filter((x) =>
          x.name
            .trim()
            ?.toLowerCase()
            .includes(search_keyword.trim()?.toLowerCase())
        );
      } else {
        search_list = [];
      }
      dispatch(getSearchList(search_list));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
      dispatch(setLoading(false));
    }
  };
}
