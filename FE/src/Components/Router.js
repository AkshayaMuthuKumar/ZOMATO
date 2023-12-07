import React, {  } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Login from './Login';
import Signup from './Signup';

function Router() {
  // State variable to track login success

  return (
    <BrowserRouter>
      <>
        <Route path="/home" component={Header} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/details" component={Details} />
      </>
    </BrowserRouter>
  );
}

export default Router;
