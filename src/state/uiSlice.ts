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
    setOpenStatGraphs: (state, action: PayloadAction<SetUiOpenStatGraph>) => {
      const osg = state.openStatGraphs.filter((g) => g !== action.payload.character_id);
      state.openStatGraphs = osg;
    }
  }
});

export const { setOpenStatGraphs } = uiSlice.actions;
export default uiSlice.reducer;
