import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';

import { Game } from '../models/game';
import { EntitiesData } from './dtos';

export const gamesSlice = createSlice({
  name: 'games',
  initialState: [] as Game[],
  reducers: {
    gamesLoaded: (state, action: PayloadAction<EntitiesData<Game>>) => {
      action.payload.data?.forEach((game) => {
        const existingGame = state.find((eg) => eg.id === game.id);
        if (existingGame) {
          Object.assign(existingGame, game);
          existingGame.character = orderBy(existingGame.character, ['name'], ['asc']);
        } else {
          game.character = orderBy(game.character, ['name'], ['asc']);
          state.push(game);
        }
      });

      return state;
    }
  }
});

export const { gamesLoaded } = gamesSlice.actions;
export default gamesSlice.reducer;
