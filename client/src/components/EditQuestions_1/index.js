import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
 
const Edit = () => {
 const [form, setForm] = useState({
   content: "",
   answer:new Map,
 });
 const params = useParams();
 const navigate = useNavigate();
 

 const [questions, setQuestions] = useState([
  {answer: ""},
  {answer: ""},
  {answer: ""},
]);

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:8080/api/recordlist/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/recordlist");
       return;
     }
    //  setQuestions(form.answer);
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 


//handle form change
  const handleQuestionChange = ({ currentTarget: input }) => {
  setForm(form=>({ ...form, content:input.value }));
  };	



//handle answer change
const handleAnswerChange = (e, index) => {
  const {name, value} = e.target
  const list = [...questions];
  list[index][name] = value;
  setQuestions(list);
}
const [data, setData] = useState({
  correctAnswer:new Map,
});


const handleCorrectAnswerChange = ({ currentTarget: input }) => {
  setData(data=>({ ...data,  correctAnswer:data.correctAnswer.set(input.name,input.value)}));
};

    //handle form submit
    function handleSubmit(event) {
        event.preventDefault();
        const id = params.id.toString();
        const content = form.content;
        const answer = [...questions.map(question => question.answer)];
        const correctAnswer = [...data.correctAnswer.values()];
        const submitData = { id, content, answer, correctAnswer};
        const url = `http://localhost:8080/api/recordlist/update/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        };
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((submitData) => {
                window.alert(`Record with id ${id} updated`);
                navigate("/recordlist");
            })
            .catch((err) => {
                window.alert(`An error has occurred: ${err.message}`);
            });
    }

    
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="main_container">
     <div className="centered">
     <form onSubmit={handleSubmit} className="form_questions">
         <label htmlFor="name">Treść pytania: </label>
         <input
           type="text"
           className="login_register_input"
           id="content"
           value={form.content}
           onChange={handleQuestionChange}
         />
         <h1>Odpowiedzi</h1>
       {Array.from(form.answer).map((question , index) => (
				<div key={index}>
				<input className="login_register_input"
					  	type="text"
					  	placeholder="Odpowiedz"
					  	name="answer"
						defaultValue={question}
						onChange={(e) => handleAnswerChange(e, index)}
						required
					  />

        <input type="checkbox" className="answer_chbox" value={index} onChange={handleCorrectAnswerChange} name={index}></input>
            </div>
       ))}

      
         <button
           type="submit"
           className="btn_login_register">
             Zaktualizuj pytanie
          </button>
     </form>

      </div>
   </div>
 );
};

export default Edit;