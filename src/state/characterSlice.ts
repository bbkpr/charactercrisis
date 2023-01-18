import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../models/character';
import { AsyncLoadable } from './dtos';

/** @see https://redux-toolkit.js.org/api/createEntityAdapter */
const charactersAdapter = createEntityAdapter<Character>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export interface CharacterData extends AsyncLoadable<Character> {
  characters: Character[];
}

// Can import the whole thing if you want
export const charactersSlice = createSlice({
  name: 'characters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: charactersAdapter.getInitialState(),
  reducers: {
    charactersLoading: (state, action: PayloadAction<AsyncLoadable<Character>>) => {
      //state.
    }
  }
});

export const { charactersLoading } = charactersSlice.actions;
export default charactersSlice.reducer;
