import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './modules/header/Header'
import Favorites from './modules/favorites/Favorites'
import Home from './modules/home/Home'

function App() {
  return (
    <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
