import ReactDOM from 'react-dom';

import { SnackbarProvider } from 'notistack';

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
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Scaffold onOptionClick={handleNavigate} options={options}>
        <Route path="/">
          <Route path="/" exact>
            <ListPage />
          </Route>
          <Route path="/([a-z0-9\-]+)">
            <OnePage />
          </Route>
        </Route>
      </Scaffold>
    </SnackbarProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
