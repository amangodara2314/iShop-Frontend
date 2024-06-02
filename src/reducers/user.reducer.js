import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    lsLogin(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        state.user = user;
      }
    },
  },
});
export const { login, logout, lsLogin } = UserSlice.actions;
export default UserSlice.reducer;
