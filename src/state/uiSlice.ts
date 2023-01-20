import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UiState } from './uiState';

export interface SetUiOpenStatGraph {
  character_id: number;
  open: boolean;
}
export const uiSlice = createSlice({
  name: 'ui',
  initialState: { openStatGraphs: [] } as UiState,
  reducers: {
    /**
     * @param state UiState
     * @param action character_id
     */
    toggleStatGraph: (state, action: PayloadAction<number>) => {
      if (state.openStatGraphs.includes(action.payload)) {
        state.openStatGraphs = state.openStatGraphs.filter((g) => g !== action.payload);
      } else {
        state.openStatGraphs.push(action.payload);
      }
    }
  }
});

export const { toggleStatGraph } = uiSlice.actions;
export default uiSlice.reducer;
