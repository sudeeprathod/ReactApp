import React, { Component } from "react";
import './App.css';
import FetchBankData from "./components/fetch";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App">
        <FetchBankData />
      </div>
    );
  }
}

export default App;
