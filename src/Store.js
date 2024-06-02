import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
