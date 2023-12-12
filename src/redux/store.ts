import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;