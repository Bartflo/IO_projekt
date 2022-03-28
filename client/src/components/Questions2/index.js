import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Questions2 = () => {
	const [data, setData] = useState({
		content: "",
		//correctAnswer: "",
	});
	
    const [error, setError] = useState("");
	
    const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, content:input.value.split(" ") }));
	};
	
	const handleCorrectAnswerChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
 
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions2";
			const { data: res } = await axios.post(url, {
				content:data.content,
				//correctAnswer:data.correctAnswer, 
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
				<h1>Aplikacja</h1>
				<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
				<Link to="/questions" className="btn_logout">Dodaj pytanie kolejność</Link>
                <Link to="/questions2" className="btn_logout">Dodaj pytanie wypełnianie</Link>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions"> 
			<h2>Wybierz słowo do uzupełnienia</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść pytania"
					  	name="content"
	  					onChange={handleQuestionChange}
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

export default Questions2;
