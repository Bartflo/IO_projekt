import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   content: "",
   answer: "",
   correctAnswer: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
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
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
//handle form change
    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ [name]: value });
    }

    //handle form submit
    function handleSubmit(event) {
        event.preventDefault();
        const id = params.id.toString();
        const content = form.content;
        const answer = form.answer;
        const correctAnswer = form.correctAnswer;
        const data = { id, content, answer, correctAnswer};
        const url = `http://localhost:8080/api/recordlist/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                window.alert(`Record with id ${id} updated`);
                navigate("/");
            })
            .catch((err) => {
                window.alert(`An error has occurred: ${err.message}`);
            });
    }



 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     content: form.content,
     answer: form.answer,
     correctAnswer: form.correctAnswer,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:8080/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }

    
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label htmlFor="name">Treść pytania: </label>
         <input
           type="text"
           className="form-control"
           id="content"
           value={form.content}
           onChange={handleChange}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Odpowiedzi: </label>
         <input
           type="text"
           className="form-control"
           id="answer"
           value={form.answer}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Intern"
             checked={form.correctAnswer === 1}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">1</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.correctAnswer === 2}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">2</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.correctAnswer === 3}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">3</label>
       </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}