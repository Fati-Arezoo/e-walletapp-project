import { Switch, Route } from "react-router";
import "./App.css";
import AddCard from "./components/AddCard";
import Home from "./components/Home";
import logo from "./components/bild/E-wallet.png";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getUser } from "./components/cardSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="App">
      <div>
        <img src={logo} alt="logopicture" />
      </div>
      <Switch>
        <Route exact path="/" render={() => <Home />}></Route>
        <Route exact path="/addcard" render={() => <AddCard />}></Route>
      </Switch>
    </div>
  );
}

export default App;
