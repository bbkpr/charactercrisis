import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../models/game';

import { EntitiesData } from './dtos';

// Can import the whole thing if you want
export const gamesSlice = createSlice({
  name: 'games',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [] as Game[],
  reducers: {
    gamesLoaded: (state, action: PayloadAction<EntitiesData<Game>>) => {
      return action.payload.data;
    }
  }
});

export const { gamesLoaded } = gamesSlice.actions;
export default gamesSlice.reducer;
