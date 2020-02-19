import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from "./Routing";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>
    
  );
}

export default App;
