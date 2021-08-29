import React from 'react';
import ReactDOM from 'react-dom';

import { Route } from 'react-micro-router';

import ListPage from './pages/ListPage';
import OnePage from './pages/OnePage';

const App = () => (
  <Route path="/">
    <Route path="/" exact>
      <ListPage />
    </Route>
    <Route path="/([a-z]+)">
      <OnePage />
    </Route>
  </Route>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
