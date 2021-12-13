import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/initial/LandingPage';
import Login from './components/initial/Login';
import Register from './components/initial/Register';
import Dashboard from './components/user/Dashboard';
import Manage from './components/household/Manage';
import Household from './components/household/Household';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/household-dashboard" component={Household} />
          <Route exact path="/manage-household" component={Manage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
