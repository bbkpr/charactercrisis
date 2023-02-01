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
import Characters from './components/Characters/Characters';
import GameDetails from './components/GameDetails/GameDetails';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth" element={<SupabaseAuth />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:character_id" element={<CharacterDetails />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:game_id" element={<GameDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/charactersrt" element={<CharactersRt />} />
        <Route path="/*" element={<Characters />} />
      </Route>
    </Routes>
  ) as React.ReactElement;
}

export default App;
