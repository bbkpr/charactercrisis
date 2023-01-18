import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Stat } from '../models/stat';
import { EntitiesData } from './dtos';

// Can import the whole thing if you want
export const statsSlice = createSlice({
  name: 'stats',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [] as Stat[],
  reducers: {
    statsLoaded: (state, action: PayloadAction<EntitiesData<Stat>>) => {
      return action.payload.data;
    }
  }
});

export const { statsLoaded } = statsSlice.actions;
export default statsSlice.reducer;
