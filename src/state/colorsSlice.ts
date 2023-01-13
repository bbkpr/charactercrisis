import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorsModel } from '../models/colorsModel';
import { publicApi } from '../utils/api';

export const initialState: ColorsModel = {
  colors: [],
  error: false,
  loading: false,
  loaded: false
};

/**
 * `AsyncThunk` to load the list of available colors
 */
export const getColors = createAsyncThunk('colors/get', async () => {
  const response = await publicApi.get<string[]>('/colors');
  return response.data;
});

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColors.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
      state.loaded = true;
      state.loading = false;
      state.error = false;

      return state;
    });

    builder.addCase(getColors.pending, (state) => {
      state.loaded = false;
      state.loading = true;
      state.error = false;
      return state;
    });

    builder.addCase(getColors.rejected, (state) => {
      state.loaded = false;
      state.loading = false;
      state.error = true;
      return state;
    });
  }
});

// export const {} = colorsSlice.actions;
export default colorsSlice.reducer;
