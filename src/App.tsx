import { Routes, Route } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('./pages/home/home'))
const Play = lazy(() => import("./pages/play/play"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/:sessionName" component={Play} />
    </Routes>
  );
};

export default App;
