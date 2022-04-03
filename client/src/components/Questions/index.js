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
			
			<nav className="navbar">
			<Link to="/" className="logo">Aplikacja</Link>
				<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
				<Link to="/questions3" className="btn_logout">Dodaj pytanie wypełnianie</Link>
				<Link to="/questions2" className="btn_logout">Dodaj pytanie kolejność</Link>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
			<div className="centered">
			
			{console.log(questions)}
			<form onSubmit={handleSubmit} className="form_questions"> 
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
					<input type="checkbox" value={index} onChange={handleCorrectAnswerChange} name={index}></input>
					{questions.length -1 === index &&
					<button className="btn_add" type="submit" onClick={handleAnswerAdd}>Dodaj</button>}
				
				{questions.length > 1 && (
				<button className="btn_remove"
				type="button"
				onClick={() => handleAnswerRemove(index)}>
				Usuń
				</button>
				
				)}
				
				</div>
				
						
				
				))}
				<button type="submit" className="btn_login_register">
				  Dodaj
				  </button>
			 </form>
		</div>
		</div>
	);
};


export default Questions;














































// import React from 'react'
// import { useState } from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
// const Questions = () => {
	
// 	const [serviceList, setServiceList] = useState([{ service: "" }]);

// 	const handleServiceChange = (e, index) => {
// 	  const { name, value } = e.target;
// 	  const list = [...serviceList];
// 	  list[index][name] = value;
// 	  setServiceList(list);
// 	};
  
// 	const handleServiceRemove = (index) => {
// 	  const list = [...serviceList];
// 	  list.splice(index, 1);
// 	  setServiceList(list);
// 	};
  
// 	const handleServiceAdd = () => {
// 	  setServiceList([...serviceList, { service: "" }]);
// 	};
  
// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		window.location.reload();
// 	};

// 	return (
// 		<div className="main_container">
			
// 		<nav className="navbar">
// 		<Link to="/" className="logo">Aplikacja</Link>
// 			<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
// 				<Link to="/questions3" className="btn_logout">Dodaj pytanie kolejność</Link>
//                 <Link to="/questions2" className="btn_logout">Dodaj pytanie wypełnianie</Link>
// 			<button className="btn_logout" onClick={handleLogout}>
// 				Wyloguj
// 			</button>
// 		</nav>
// 		<div className="centered">

// 	  <form className="form_questions" autoComplete="off">
// 		 <h2>Zaznacz prawidłową odpowiedź</h2>
// 		  {serviceList.map((singleService, index) => (
// 			<div key={index} className="services">
// 			  <div className="login_register_input">
// 				<input
// 				  name="service"
// 				  type="text"
// 				  id="service"
// 				  value={singleService.service}
// 				  onChange={(e) => handleServiceChange(e, index)}
// 				  required
// 				/>
// 				{serviceList.length - 1 === index && serviceList.length < 7 && (
// 				  <button
// 					type="button"
// 					onClick={handleServiceAdd}
// 					className="add-btn"
// 				  >
// 					<span>Add a Service</span>
// 				  </button>
// 				)}
// 			  </div>
// 			  <div className="login_register_input">
// 				{serviceList.length !== 1 && (
// 				  <button
// 					type="button"
// 					onClick={() => handleServiceRemove(index)}
// 					className="remove-btn"
// 				  >
// 					<span>Remove</span>
// 				  </button>
// 				)}
// 			  </div>
// 			</div>
// 		  ))}
	
// 		<div className="output">
// 		  <h2>Output</h2>
// 		  {serviceList &&
// 			serviceList.map((singleService, index) => (
// 			  <ul key={index}>
// 				{singleService.service && <button value={singleService.service}>{singleService.service}</button>}
// 			  </ul>
// 			))}
// 		</div>
// 	  </form>
// 	</div>
// 	</div>
// 	);
//   }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*const [data, setData] = useState({
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
				<Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
				<Link to="/questions" className="btn_logout">Dodaj pytanie kolejność</Link>
				<Link to="/questions2" className="btn_logout">Dodaj pytanie wypełnianie</Link>
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
*/

