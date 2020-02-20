import React from 'react';
import './App.css';
import Routing from "./Routing";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./store/reducer/reducer";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>

  );
}

export default App;
