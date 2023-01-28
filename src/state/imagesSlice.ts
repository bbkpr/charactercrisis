import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../models/image';

import { EntitiesData } from './dtos';

// Can import the whole thing if you want
export const imagesSlice = createSlice({
  name: 'images',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [] as Image[],
  reducers: {
    imagesLoaded: (state, action: PayloadAction<EntitiesData<Image>>) => {
      return action.payload.data;
    }
  }
});

export const { imagesLoaded } = imagesSlice.actions;
export default imagesSlice.reducer;
