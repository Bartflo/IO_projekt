import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import styles from "../Login/styles.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
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

		<div className="centered">
		<div id="formContent">


	  <Link to="/login"  className="inactive"> Zaloguj się </Link>
	  <h2 className="active">Rejestracja</h2>



		  <form onSubmit={handleSubmit}> 
			  <input className="login_register_input"
					  type="text"
					  	placeholder="Imię"
					  	name="firstName"
	  					onChange={handleChange}
						value={data.firstName}
					  	required
					  />
			  <input className="login_register_input"
			   		type="text"
					placeholder="Nazwisko"
					name="lastName"
					onChange={handleChange}
					value={data.lastName}
					required
					  />
				
				<input className="login_register_input"
			   		type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
					  />
				
				<input className="login_register_input"
			   		type="password"
					placeholder="Hasło"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					  />
			  <button type="submit" className="btn_login_register">
				  Zarejestruj
				  </button>
		  <div className="errors">{error}</div>
			  
		  </form>

		</div>

  	</div>
	);
};

export default Signup;
