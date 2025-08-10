import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MainApp } from './Components/MainApp/MainApp';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
    <MainApp></MainApp>
    </Provider>
  );
}

export default App;
