import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import charactersReducer from '../state/charactersSlice';
import gamesReducer from '../state/gamesSlice';
import imagesReducer from '../state/imagesSlice';
import statsReducer from '../state/statsSlice';
import uiReducer from '../state/uiSlice';

import type { RenderOptions } from '@testing-library/react';
import type { AppStore, RootState } from '../state/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * This type interface extends the default options for render from RTL, and
 * allows the user to specify other things such as initialState, store.
 */
interface ExtendedRenderOptionsWithRouter extends ExtendedRenderOptions {
  /**
   * Path to set the initial `window.location`, passed to `navigate(routePath)`
   */
  routePath?: string;
}

/**
 * Render `children` wrapped in `React.StrictMode` and `Provider` (react-redux)
 * @see https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 * @param element
 * @param param1 ExtendedRenderOptions
 * @returns
 */
export function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        characters: charactersReducer,
        games: gamesReducer,
        images: imagesReducer,
        stats: statsReducer,
        ui: uiReducer
      },
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * Render `children` wrapped in `React.StrictMode`,`Provider` (react-redux), and `BrowserRouter`
 * @see https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 * @param element
 * @param param1 ExtendedRenderOptionsWithRouter
 * @returns
 */
export const renderWithProviderAndRouter = (
  element: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        characters: charactersReducer,
        games: gamesReducer,
        images: imagesReducer,
        stats: statsReducer,
        ui: uiReducer
      },
      preloadedState
    }),
    routePath = '/',
    ...renderOptions
  }: ExtendedRenderOptionsWithRouter = {}
) => {
  window.history.pushState({}, 'test', routePath);

  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's (React Testing Library `@testing-library/react`) query functions
  return { store, userEvent: userEvent.setup(), ...rtlRender(element, { wrapper: Wrapper, ...renderOptions }) };
};
