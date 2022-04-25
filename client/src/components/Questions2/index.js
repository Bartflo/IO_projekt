import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Questions2 = () => {
	const [data, setData] = useState({
		content2: "",
	});
	
    const [error, setError] = useState("");
	
    const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, content2:input.value.split(" ") }));
	};
	
 
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions";
			const { data: res } = await axios.post(url, {
				content2:data.content2,
			});
			window.location.reload(false);
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
			<Link to="/" className="logo">Aplikacja</Link>
				<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
				<Link to="/questions3" className="btn_logout">Dodaj pytanie wypełnianie</Link>
                <Link to="/questions2" className="btn_logout">Dodaj pytanie kolejność</Link>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions"> 
			<h2>Wpisz zapytanie</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść pytania"
					  	name="content2"
	  					onChange={handleQuestionChange}
						required
					  />
				
				<button type="submit" className="btn_login_register">
				  Dodaj pytanie do bazy
				  </button>
			 </form>
		</div>
		</div>
	);
};

export default Questions2;
