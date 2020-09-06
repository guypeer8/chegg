import React from 'react';
import { Router } from '@reach/router';

import HomePage from './pages/home';

import { useGlobalResolution } from './hooks/global'

const App = () => {
  useGlobalResolution();

  return (
    <Router>
      <HomePage path="/" />
    </Router>
  );
};

export default App;
