import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shops: [],
    intent: "",
  },
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    setIntent: (state, action) => {
      console.log("setting intent: " + action.payload);
      state.intent = action.payload;
    },
  },
});

export const { setShops, setIntent } = shopSlice.actions;

export default shopSlice.reducer;
export const selectShops = (state) => state.shop.shops;
export const getIntent = (state) => state.shop.intent;
