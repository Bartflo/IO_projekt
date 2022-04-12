import React, { Component }  from 'react';

import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/index";
import Signup from "./components/Singup/index";
import Login from "./components/Login/index";
import Questions from "./components/Questions/index";
import Questions2 from "./components/Questions2/index";
import Questions3 from "./components/Questions3/index";
import RecordList from "./components/RecordList/index";
import EditQuestions from "./components/EditQuestions/index";
import Navbar from "./components/Navbar/index";

function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
		{user && <Navbar/>}
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{user && <Route path="/questions" exact element={<Questions/>}/>}
			{user && <Route path="/questions2" exact element={<Questions2/>}/>}
			{user && <Route path="/questions3" exact element={<Questions3/>}/>}
			{user && <Route path="/recordlist" exact element={<RecordList/>}/>}
			{user && <Route path="/edit/:id" element={<EditQuestions/>}/>}"
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/questions" element={<Navigate replace to="/login" />} />
			<Route path="/questions2" element={<Navigate replace to="/login" />} />
			<Route path="/questions3" element={<Navigate replace to="/login" />} />
			<Route path="/recordlist" element={<Navigate replace to="/login" />} />
		</Routes>
		</div>
	);
}

export default App;
