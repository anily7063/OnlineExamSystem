import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userAns: {
      answer: null,
    },
  },
  reducers: {
    answerOptions: (state, action) => {
      state.userAns = action.payload;
    },
  },
});

export const { answerOptions } = userSlice.actions;
export const selectUser = (state) => state.userAns;
export default userSlice.reducer;