import React from 'react'
import { useState } from "react";
import axios from "axios";

const Questions = () => {
	const [data, setData] = useState({
		content: "",
		answer:new Map,
		correctAnswer:0,
	});
	const [error, setError] = useState("");
	const handleQuestionChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data, content:input.value }));
	};
	
	const handleCorrectAnswerChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data,  answer:data.answer.set(input.name,input.value)}));
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions";
			const { data: res } = await axios.post(url, {
				content:data.content,
				answer:[...data.answer.values()],
				correctAnswer:data.correctAnswer,
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
				<button className="btn_logout">Dodaj pytanie</button>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions"> 
			<h2>Zaznacz prawidłowa odpowiedz</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść pytania"
					  	name="content"
	  					onChange={handleQuestionChange}
						required
					  />
				<div className="answer">
				<input className="login_register_input"
					  	type="text"
					  	placeholder="Odpowiedz 1"
					  	name="answer1"
	  					onChange={handleChange}
						required
					  />
				<input type="radio" name="correctAnswer" value="0" onChange={handleCorrectAnswerChange}/>
				</div>
				<div className="answer">
				<input className="login_register_input"
					  	type="text"
					  	placeholder="Odpowiedz 2"
					  	name="answer2"
	  					onChange={handleChange}
					  />
				<input type="radio" name="correctAnswer" value="1" onChange={handleCorrectAnswerChange}/>
				</div>
				<div className="answer">
				<input className="login_register_input"
					  	type="text"
					  	placeholder="Odpowiedz 3"
					  	name="answer3"
	  					onChange={handleChange}
					  />
				<input type="radio" name="correctAnswer" value="2" onChange={handleCorrectAnswerChange}/>
				</div>
				<button type="submit" className="btn_login_register">
				  Dodaj
				  </button>
			 </form>
		</div>
		</div>
	);
};

export default Questions;
