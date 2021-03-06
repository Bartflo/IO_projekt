import React from 'react'
import { useState } from "react";
import axios from "axios";
const Questions2 = () => {
	const [data, setData] = useState({
		content2: "",
		type:2,
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
				type:data.type,
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
