import React, { Component }  from 'react';

import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/index";
import Signup from "./components/Singup/index";
import Login from "./components/Login/index";
import Questions from "./components/Questions/index";
import Questions2 from "./components/Questions2/index";
import Questions3 from "./components/Questions3/index";
import RecordList from "./components/RecordList/index";
import EditQuestions_1 from "./components/EditQuestions_1/index";
import EditQuestions_2 from "./components/EditQuestions_2/index";
import EditQuestions_3 from "./components/EditQuestions_3/index";
import EditTest from "./components/EditTest/index";
import Testslist from "./components/Tests/index";
import Navbar from "./components/Navbar/index";
import CreateGroup from "./components/CreateGroup/index";
import GroupList from ".//components/GroupList/index";
import EditGroup from "./components/EditGroup/index";
import TestSolve from "./components/SolveTest/index";
import YourTests from "./components/YourTests/index";
import "./App.css";



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
			{user && <Route path="/edit_1/:id" element={<EditQuestions_1/>}/>}
			{user && <Route path="/edit_2/:id" element={<EditQuestions_2/>}/>}
			{user && <Route path="/edit_3/:id" element={<EditQuestions_3/>}/>}
			{user && <Route path="/testslist" element={<Testslist/>}/>}
			{user && <Route path="/edittest/:id" element={<EditTest/>}/>}
			{user && <Route path="/create_group" element={<CreateGroup/>}/>}
			{user && <Route path="/group_list" element={<GroupList/>}/>}
			{user && <Route path="/edit_group/:id" element={<EditGroup/>}/>}
			{user && <Route path="/your_tests" exact element={<YourTests/>}/>}
			{user && <Route path="/test_solve/:id" exact element={<TestSolve/>}/>}


			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/questions" element={<Navigate replace to="/login" />} />
			<Route path="/questions2" element={<Navigate replace to="/login" />} />
			<Route path="/questions3" element={<Navigate replace to="/login" />} />
			<Route path="/recordlist" element={<Navigate replace to="/login" />} />
			<Route path="/edit_1/:id" element={<Navigate replace to="/login" />} />
			<Route path="/edit_2/:id" element={<Navigate replace to="/login" />} />
			<Route path="/edit_3/:id" element={<Navigate replace to="/login" />} />
			<Route path="/testslist" element={<Navigate replace to="/login" />} />
			<Route path="/edittest/:id" element={<Navigate replace to="/login" />} />
			<Route path="/create_group" element={<Navigate replace to="/login" />} />
			<Route path="/group_list" element={<Navigate replace to="/login" />} />
			<Route path="/edit_group/:id" element={<Navigate replace to="/login" />} />

		</Routes>
		</div>
	);
}

export default App;
