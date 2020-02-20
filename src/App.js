import React from 'react';
import './App.css';
import Routing from "./Routing";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./store/reducer/reducer";
import {firebaseConfig} from "./firebase/configFirbase";
import * as firebase from "firebase";

const store = createStore(reducer);

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>

  );
}

export default App;
