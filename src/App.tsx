import './app.scss';

import 'reflect-metadata';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';

import { someApi } from './apis/someApi';
import Layout from './pages/Layout';
import UnderConstruction from './pages/UnderConstruction';
import Characters from './components/Characters/Characters';

function App() {
  const [cookies] = useCookies();
  useEffect(() => {
    const hasToken = cookies.token != null && cookies.token.length > 0;
    if (hasToken) {
      someApi.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
    } else {
      someApi.defaults.headers.common['Authorization'] = '';
    }
  }, [cookies]);
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
