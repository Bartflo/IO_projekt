import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./styles.css"

const Main = () => {
	
	const [data, setData] = useState({
		name: "",
		questions: [],
		questions2: [],
		questions3: [],

	});
	
	const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, name:input.value }));
	};
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


	const [error, setError] = useState("");
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/test";
			const { data: res } = await axios.post(url, {
				name:data.name,
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
			
			<form onSubmit={handleSubmit} className="form_questions" autoComplete='off'> 
			<h2>Wpisz nazwę testu</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Nazwa testu"
					  	name="name"
	  					onChange={handleQuestionChange}
						required
					  />
				
				<button type="submit" className="btn_login_register">
				  Utwórz test
				  </button>
			 </form>
		</div>
		</div>
	);
};

export default Main;
