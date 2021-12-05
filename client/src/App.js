import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/initial/LandingPage';
import Login from './components/initial/Login';
import Register from './components/initial/Register';


function App() {
  return (
    <>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    
    </>
  );
}

export default App;
