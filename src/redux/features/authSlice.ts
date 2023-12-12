import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    counter : 0
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
}
});
export const { increment, decrement, incrementByAmount } = authSlice.actions;
export default authSlice.reducer;