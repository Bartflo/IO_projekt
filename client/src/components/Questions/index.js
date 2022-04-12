import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Questions = () => {
	const [data, setData] = useState({
		content: "",
		answer:new Map,
		correctAnswer:new Map,
	});
	const [error, setError] = useState("");
	
	

	const handleQuestionChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data, content:input.value }));
	};	
	
	const handleCorrectAnswerChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data,  correctAnswer:data.correctAnswer.set(input.name,input.value)}));
	};


	const [questions, setQuestions] = useState([
		{answer: ""},
		{answer: ""},
		{answer: ""},
	]);
	
	const handleAnswerAdd = () => {
		setQuestions(questions => [...questions, {answer: ""}]);
	};
	
	const handleAnswerRemove = (index) => {
		const list = [...questions];
		list.splice(index, 1);
		setQuestions(list);
	};

	const handleAnswerChange = (e, index) => {
		const {name, value} = e.target
		const list = [...questions];
		list[index][name] = value;
		setQuestions(list);
	}

	const [allquestions, setallQuestions] = useState([]);

	async function showData(){
		axios.get("http://localhost:8080/api/edit_questions")
			.then(res => {
				const result = Array.from(res.data).map(item => {
					return {
						id: item._id,
						content: item.content,
						answer: item.answer,
						correctAnswer: item.correctAnswer,
						}
						})

				console.log(result);
				setallQuestions(result);
			})
			.catch(err => {
				console.log(err);
			});
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/questions";
			const { data: res } = await axios.post(url, {
				content:data.content,
				answer:[...questions.map(question => question.answer)],
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
			
			{/* {console.log(questions)} */}
			<form onSubmit={handleSubmit} className="form_questions" autoComplete='off'> 
			<h2>Zaznacz prawidłowa odpowiedz</h2>
			  <input className="login_register_input"
					  	type="text"
					  	placeholder="Treśc pytania"
					  	name="content"
	  					onChange={handleQuestionChange}
						required
					  />
				{questions.map((question , index) => (
				<div key={index}>
				<input className="login_register_input"
					  	type="text"
					  	placeholder="Odpowiedz"
					  	name="answer"
						value={question.answer}
						onChange={(e) => handleAnswerChange(e, index)}
						required

					  />
					<input type="checkbox" className="answer_chbox" value={index} onChange={handleCorrectAnswerChange} name={index}></input>
					{questions.length -1 === index && questions.length < 6 &&
					<button className="btn_add" type="submit" onClick={handleAnswerAdd}>+</button>}
				
				{questions.length > 1 && (
				<button className="btn_remove"
				type="button"
				onClick={() => handleAnswerRemove(index)}>
				-
				</button>
				
				)}
				
				</div>
				
						
				
				))}
				<button type="submit" className="btn_login_register">
				  Dodaj pytanie do bazy
				  </button>
			 </form>


		</div>
		{/* <button onClick={showData}>test</button>
			
			{Array.from(allquestions).map(item => (
				<div key={item.id}>
					<p>Treść pytania: {item.content}</p>
					<p>Odpowiedz :{item.answer}</p>
					<p>Poprawne odpowiedzi: {item.correctAnswer}</p>
				</div>
			))} */}
		</div>
	);
};


export default Questions;
