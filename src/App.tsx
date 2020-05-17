import React from 'react';
import './App.css';
import MainPage from './main-page'
import Course from './course'

import {
  BrowserRouter as Router,
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
        <Route path="/courses/:name" component={Course} />
      </Switch>
    </Router>
  );
}

export default App;
