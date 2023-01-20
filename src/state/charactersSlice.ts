import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../models/character';
import { EntitiesData } from './dtos';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: [] as Character[],
  reducers: {
    charactersLoaded: (state, action: PayloadAction<EntitiesData<Character>>) => {
      return action.payload.data;
    }
  }
});

export const { charactersLoaded } = charactersSlice.actions;
export default charactersSlice.reducer;
