import './app.scss';

import 'reflect-metadata';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import UnderConstruction from './pages/UnderConstruction';
import Characters from './components/Characters/Characters';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/characters" element={<Characters />} />
        <Route path="/*" element={<UnderConstruction />} />
      </Route>
    </Routes>
  ) as React.ReactElement;
}

export default App;
