import React from 'react'
import { useState } from "react";
import axios from "axios";
import styles from "./styles.css"

const Main = () => {
	const [data, setData] = useState({
		content: "",
	});
	const [error, setError] = useState("");

	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions";
			const { data: res } = await axios.post(url, data);
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	
	
	
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	
	return (
		<div className="main_container">
			
			<nav className="navbar">
				<h1>Aplikacja</h1>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			<form onSubmit={handleSubmit}> 
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść"
					  	name="content"
	  					onChange={handleChange}
						value={data.content}
						required
					  />
				<button type="submit" className="btn_login_register">
				  Dodaj
				  </button>
			 </form>
		</div>
		</div>
	);
};

export default Main;
