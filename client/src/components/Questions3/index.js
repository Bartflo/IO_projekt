import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Questions3 = () => {
	const [data, setData] = useState({
		content: [],
		correctAnswer: new Map,
	});
	
	

    const [error, setError] = useState("");
	
    const handleQuestionChange = ({ currentTarget: input  }) => {
		setData(data=>({ ...data, content:input.value.split(" ") }));
	};
	
	const handleCorrectAnswerChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data,  correctAnswer:data.correctAnswer.set(input.name,input.value)}));
	};
 	
						
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions3";
			const { data: res } = await axios.post(url, {
				content:data.content,
				correctAnswer:[...data.correctAnswer.values()],
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
			
		  <div className="centered">
			
			<form onSubmit={handleSubmit} className="form_questions" autoComplete='off'> 
			
			<h2>Wpisz pytanie do uzupełnienia</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treść pytania"
					  	name="content"
	  					onChange={handleQuestionChange}
						required
					  />
			 <div>
        	{Array.from(data.content).map((subArray, index) => {
          return (
            <div key={index} className="showing_buttons">
				{console.log(data.content)}
					<div key={index} className="correctAnswer_container action">
						<label>
							<input type="checkbox" key={index} value={data.content[index]} name={data.content[index]} onChange={handleCorrectAnswerChange}/><span>{data.content[index]}</span>
						</label>
					</div>
              {/* {Array.from(subArray).map((subitem, i) => {
                return (
					<div key={i} className="correctAnswer_container action">
						<label>
                    	<input type="checkbox" key={i} value={subitem} name={subitem} onChange={handleCorrectAnswerChange}/><span>{subitem}</span>
						</label>
					</div>
				);
              })} */}
            </div>
          );
        		})}
     	 </div>
				<button type="submit" className="btn_login_register">
				  Dodaj pytanie do bazy
				  </button>

			 </form>

		
		</div>
		</div>
	);
};

export default Questions3;

