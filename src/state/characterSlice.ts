import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../models/character';

export const initialState: Character[] = [];

// Can import the whole thing if you want
export const signupSlice = createSlice({
  name: 'character',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<Character>>) => {
      state = { ...state, ...action.payload };
      return state;
    }
  }
});

export const { setFormData } = signupSlice.actions;
export default signupSlice.reducer;
