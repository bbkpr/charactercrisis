import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import colorsReducer from '../state/colorsSlice';
import signupReducer from '../state/characterSlice';

import type { RenderOptions } from '@testing-library/react';
import type { AppStore, RootState } from '../state/store';

/**
 * This type interface extends the default options for render from RTL, as well
 * as allows the user to specify other things such as initialState, store.
 */
interface ExtendedRenderOptionsWithRouter extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  /**
   * Path to set the initial `window.location`, passed to `navigate(routePath)`
   */
  routePath?: string;
  store?: AppStore;
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
    store = configureStore({ reducer: { colors: colorsReducer, signup: signupReducer }, preloadedState }),
    routePath = '/',
    ...renderOptions
  }: ExtendedRenderOptionsWithRouter = {}
) => {
  window.history.pushState({}, 'test', routePath);

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }

  // Return an object with the store and all of RTL's (React Testing Library `@testing-library/react`) query functions
  return { store, userEvent: userEvent.setup(), ...rtlRender(element, { wrapper: Wrapper, ...renderOptions }) };
};
