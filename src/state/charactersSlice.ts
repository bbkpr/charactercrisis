import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';

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
          existingCharacter.character_stat = orderBy(existingCharacter.character_stat, ['stat_id'], ['asc']);
        } else {
          char.character_stat = orderBy(char.character_stat, ['stat_id'], ['asc']);
          state.push(char);
        }
      });

      return state;
    }
  }
});

export const { charactersLoaded } = charactersSlice.actions;
export default charactersSlice.reducer;
