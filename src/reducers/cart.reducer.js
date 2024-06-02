import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    data: [],
    total: 0,
  },
  reducers: {
    dbToCart(state, { payload }) {
      let total = 0;
      payload.data.map((p) => {
        total += parseInt(p.price * p.qty);
        return;
      });
      state.total = total;
      state.data = payload.data;
      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    addToCart(state, { payload }) {
      const d = state.data.find((d) => d.pId == payload.pId);
      if (d) {
        d.qty++;
        state.total += parseInt(d.price);
      } else {
        state.data.push({
          pId: payload.pId,
          qty: payload.qty,
          price: payload.price,
        });
        state.total += parseInt(payload.price);
      }

      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    removeFromCart(state, { payload }) {
      const d = state.data.filter((p) => p.pId != payload.cart._id);
      state.total -= parseInt(payload.cart.finalPrice * payload.cart.qty);
      state.data = d;
      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    changeCartQty(state, { payload }) {
      const d = state.data.find((d) => d.pId == payload.id);

      if (payload.flag) {
        d.qty++;
        state.total += parseInt(d.price);
      } else {
        if (d.qty == 1) {
          return;
        } else {
          d.qty--;
          state.total -= parseInt(d.price);
        }
      }
      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    lsToCart(state) {
      const data = JSON.parse(localStorage.getItem("data"));
      const total = JSON.parse(localStorage.getItem("total"));
      if (data) {
        state.data = data;
        state.total = total;
      }
    },
    emptyCart(state) {
      state.data = [];
      state.total = 0;
      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
  },
});

export const {
  addToCart,
  dbToCart,
  removeFromCart,
  emptyCart,
  changeCartQty,
  lsToCart,
} = CartSlice.actions;

export default CartSlice.reducer;
