import React from 'react';
import './App.css';
import MainPage from './main-page'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/course">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
