import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Questions2 = () => {
	const [data, setData] = useState({
		content: "",
	});
	
    const [error, setError] = useState("");
	
    const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, content:input.value.split(" ") }));
	};
	
 
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions2";
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
	
	
	return (
		<div className="main_container">

			<div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions"> 
			<h2>Wpisz zapytanie</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść pytania"
					  	name="content"
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
