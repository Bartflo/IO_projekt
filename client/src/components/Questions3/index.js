import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Questions3 = () => {
	const [data, setData] = useState({
		content: "",
		
	});
	
	

    const [error, setError] = useState("");
	
    const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, content:input.value.split(" ") }));
	};
	
	const handleCorrectAnswerChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
 
	const [questions, setQuestions] = useState("");
	
	
	
	async function showData(){
		axios.get("http://localhost:8080/api/questions3")
			.then(res => {
				console.log(res.data[0].content);
				setQuestions(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	

	


	// const getData = () => {
	// 	axios
	// 		.get("http://localhost:8080/api/questions3")
	// 		.then(res => {
	// 			console.log(res)
	// 		}).catch(err => {
	// 			console.log(err)
	// 		})
	// }
	





	
						
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions3";
			const { data: res } = await axios.post(url, {
				content:data.content,
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
				<Link to="/questions3" className="btn_logout">Dodaj pytanie kolejność</Link>
                <Link to="/questions2" className="btn_logout">Dodaj pytanie wypełnianie</Link>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<button onClick={showData}>Wyswietl</button>
		
			
			<div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions"> 
			
			<h2>Wpisz pytanie</h2>
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

export default Questions3;


