import React from 'react';
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <div className="App">
       
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/chats" component={Chatpage} />
      </Switch>

    </div>
  );
}

export default App;
