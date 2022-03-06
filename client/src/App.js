import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/login';
import Register from './components/register';

function App(){
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
