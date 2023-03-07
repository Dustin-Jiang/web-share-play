import { Routes, Route } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('./pages/home/home'))
const Play = lazy(() => import("./pages/play/play"));

const App: Component = () => {
  let baseUrl = import.meta.env.BASE_URL
  return (
    <Routes>
      <Route path={`${baseUrl}/`} component={Home} />
      <Route path={`${baseUrl}/:sessionName`} component={Play} />
    </Routes>
  );
};

export default App;
