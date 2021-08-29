import React from 'react';
import ReactDOM from 'react-dom';

import { Route, redirect } from 'react-micro-router';
import { Scaffold, IMenuGroup } from 'react-declarative';

import ListPage from './pages/ListPage';
import OnePage from './pages/OnePage';

const options: IMenuGroup[] = [
  {
    label: 'List',
    name: 'list-page',
  },
];

const App = () => {
  const handleNavigate = () => redirect('/');
  return (
    <Scaffold onOptionClick={handleNavigate} options={options}>
      <Route path="/">
        <Route path="/" exact>
          <ListPage />
        </Route>
        <Route path="/([a-z]+)">
          <OnePage />
        </Route>
      </Route>
    </Scaffold>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
