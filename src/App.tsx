import { Routes,Route } from '@solidjs/router';
import type { Component } from 'solid-js';

import Home from './pages/home/home';
import Play from './pages/play/play';

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/play/:sessionName" component={Play} />
    </Routes>
  );
};

export default App;
