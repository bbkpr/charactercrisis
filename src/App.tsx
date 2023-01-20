import './app.scss';
import 'reflect-metadata';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SupabaseAuth from './components/Auth/Auth';
import Characters from './components/Characters/Characters';
import Layout from './components/Layout';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Games from './components/Games/Games';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth" element={<SupabaseAuth />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:character_id" element={<CharacterDetails />} />
        <Route path="/games" element={<Games />} />
        <Route path="/*" element={<Characters />} />
      </Route>
    </Routes>
  ) as React.ReactElement;
}

export default App;
