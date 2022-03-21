import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.css";



const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const res = await axios.post(url,data);
			localStorage.setItem("token", res.data);
			
			window.location = "/";
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


    		<h2 className="active"> Zaloguj się </h2>
			<Link to="/signup" className="inactive">Rejestracja</Link>



				<form onSubmit={handleSubmit}> 
					<input className="login_register_input"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							/>
					<input id="password" className="login_register_input"
					 type="password"
							placeholder="Hasło"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							/>
						
					<button type="submit" className="btn_login_register">
						Zaloguj
						</button>
				<div className="errors">{error}</div>
					
				</form>

  			</div>

		</div>
	);
};

export default Login;
