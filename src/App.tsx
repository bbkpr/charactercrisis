import './app.scss';

import 'reflect-metadata';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Characters from './components/Characters/Characters';
import SupabaseAuth from './components/Auth/Auth';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth" element={<SupabaseAuth />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/*" element={<Characters />} />
      </Route>
    </Routes>
  ) as React.ReactElement;
}

export default App;
