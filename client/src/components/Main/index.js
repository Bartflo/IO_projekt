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
				<Link to="/" className="logo">Aplikacja</Link>
				<Link to="/recordlist" className="btn_logout">Lista rekordków</Link>
				<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
				<Link to="/questions3" className="btn_logout">Dodaj pytanie kolejność</Link>
                <Link to="/questions2" className="btn_logout">Dodaj pytanie wypełnianie</Link>
				
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
