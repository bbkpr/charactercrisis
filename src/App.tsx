import './app.scss';
import 'reflect-metadata';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SupabaseAuth from './components/Auth/Auth';
import Layout from './components/Layout';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Games from './components/Games/Games';
import CharactersRt from './components/Characters/CharactersRt';
import AboutPage from './components/About/About';
import CharactersResp from './components/Characters/CharactersResp';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth" element={<SupabaseAuth />} />
        <Route path="/characters" element={<CharactersResp />} />
        <Route path="/characters/:character_id" element={<CharacterDetails />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/charactersrt" element={<CharactersRt />} />
        <Route path="/*" element={<CharactersResp />} />
      </Route>
    </Routes>
  ) as React.ReactElement;
}

export default App;
