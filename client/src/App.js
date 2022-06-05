import React, {Component, useEffect,useState} from 'react';

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
import NavbarAdmin from "./components/NavbarAdmin/index";
import NavbarUser from "./components/Navbar/index";
import CreateGroup from "./components/CreateGroup/index";
import GroupList from "./components/GroupList/index";
import EditGroup from "./components/EditGroup/index";
import TestSolve from "./components/SolveTest/index";
import YourTests from "./components/YourTests/index";
import "./App.css";
import jwt_decode from "jwt-decode";


function App() {
	const user = localStorage.getItem("token");

	const[loggedUser, setLoggedUser] = useState([])
		useEffect(() => {
			async function getUser() {
				try
				{
					const decoded = jwt_decode(user);
					const id = decoded._id
					const response = await fetch(`http://localhost:8080/api/auth/${id}`);

					if (!response.ok) {
						const message = `An error occurred: ${response.statusText}`;
						window.alert(message);
						return;
					}
					const actualUser = await response.json();

					setLoggedUser(actualUser);
				}catch(error)
				{
					console.log(error);
				}
				}


			getUser();
			return;
		},[]);

	return (
	<div>
		{loggedUser.isAdmin ? <NavbarAdmin/> : (user && <NavbarUser/>)}
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{(loggedUser.isAdmin === true) && <Route path="/questions" exact element={<Questions/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/questions2" exact element={<Questions2/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/questions3" exact element={<Questions3/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/recordlist" exact element={<RecordList/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/edit_1/:id" element={<EditQuestions_1/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/edit_2/:id" element={<EditQuestions_2/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/edit_3/:id" element={<EditQuestions_3/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/testslist" element={<Testslist/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/edittest/:id" element={<EditTest/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/create_group" element={<CreateGroup/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/group_list" element={<GroupList/>}/>}
			{(loggedUser.isAdmin === true) && <Route path="/edit_group/:id" element={<EditGroup/>}/>}
			{user && <Route path="/your_tests" exact element={<YourTests/>}/>}
			{user && <Route path="/test_solve/:id" exact element={<TestSolve/>}/>}
			{console.log(loggedUser.isAdmin)};


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
