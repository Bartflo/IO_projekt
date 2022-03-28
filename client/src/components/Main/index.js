import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./styles.css"

const Main = () => {

	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	
	return (
		<div className="main_container">
			
			<nav className="navbar">
				<h1>Aplikacja</h1>
				<Link to="/questions" className="btn_logout">Dodaj pytanie</Link>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			
		</div>
		</div>
	);
};

export default Main;
