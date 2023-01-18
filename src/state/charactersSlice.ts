import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../models/character';
import { EntitiesData } from './dtos';

// Can import the whole thing if you want
export const charactersSlice = createSlice({
  name: 'characters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [] as Character[],
  reducers: {
    charactersLoaded: (state, action: PayloadAction<EntitiesData<Character>>) => {
      return action.payload.data;
    }
  }
});

export const { charactersLoaded } = charactersSlice.actions;
export default charactersSlice.reducer;
