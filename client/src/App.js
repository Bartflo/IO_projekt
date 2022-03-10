import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
//import Login from './components/login';
//import Register from './components/register';
import Create from "./components/create";
import RecordList from "./components/recordList";

function App(){
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<Create/>}/>
          <Route path="/" element={<RecordList/>}/>

          {/* <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
