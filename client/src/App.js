import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/initial/LandingPage';
import Login from './components/initial/Login';
import Register from './components/initial/Register';
import Dashboard from './components/user/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
