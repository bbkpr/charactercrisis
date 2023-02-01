import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../models/character';
import { EntitiesData } from './dtos';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: [] as Character[],
  reducers: {
    charactersLoaded: (state, action: PayloadAction<EntitiesData<Character>>) => {
      action.payload.data.forEach((char) => {
        const existingCharacter = state.find((ec) => ec.id === char.id);
        if (existingCharacter) {
          Object.assign(existingCharacter, char);
        } else {
          state.push(char);
        }
      });

      return state;
    }
  }
});

export const { charactersLoaded } = charactersSlice.actions;
export default charactersSlice.reducer;
