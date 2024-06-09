import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  username: null,
  token: null,
  phone: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.phone = action.payload.phone;
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.username = null;
      state.token = null;
      state.phone = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
