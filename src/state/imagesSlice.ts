import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Image } from '../models/image';
import { EntitiesData } from './dtos';

export const imagesSlice = createSlice({
  name: 'images',
  initialState: [] as Image[],
  reducers: {
    imagesLoaded: (state, action: PayloadAction<EntitiesData<Image>>) => {
      action.payload.data.forEach((img) => {
        const existingImage = state.find((ei) => ei.id === img.id);
        if (existingImage) {
          Object.assign(existingImage, img);
        } else {
          state.push(img);
        }
      });
    }
  }
});

export const { imagesLoaded } = imagesSlice.actions;
export default imagesSlice.reducer;
