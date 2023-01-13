import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignupModel } from '../models/signupModel';

export const initialState: SignupModel = {
  color: '',
  email: '',
  name: '',
  password: '',
  terms: false
};

// Can import the whole thing if you want
export const signupSlice = createSlice({
  name: 'signup',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<SignupModel>>) => {
      state = { ...state, ...action.payload };
      return state;
    }
  }
});

export const { setFormData } = signupSlice.actions;
export default signupSlice.reducer;
