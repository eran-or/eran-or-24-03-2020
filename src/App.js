import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './modules/header/Header'
import Favorites from './modules/favorites/Favorites'
import Home from './modules/home/Home'

function App() {
  return (
    <>
    <Router basename="/eran-or-24-03-2020">
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
