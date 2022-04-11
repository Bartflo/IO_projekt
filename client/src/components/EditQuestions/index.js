import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
 
export default function Edit() {
 const [form, setForm] = useState({
   content: "",
   answer: "",
   correctAnswer: "",

 });
 const params = useParams();
 const navigate = useNavigate();
 
 const [questions, setQuestions] = useState([]);

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
 
 async function showForm(){
  axios.get(`http://localhost:8080/api/recordlist/${params.id.toString()}`)
      .then(res => {
          const result = Array.from(res.data).map(element => {
              return {
                  id: element._id,
                  content: element.content,
                  answer: element.answer,
                  correctAnswer: element.correctAnswer,
                  }
                  });
          console.log(result);
          setQuestions(result);
      })
      .catch(err => {
          console.log(err);
      });
};


//handle form change
  const handleQuestionChange = ({ currentTarget: input }) => {
  setForm(form=>({ ...form, content:input.value }));
  };	

    //handle form submit
    function handleSubmit(event) {
        event.preventDefault();
        const id = params.id.toString();
        const content = form.content;
        const answer = form.answer;
        const correctAnswer = form.correctAnswer;
        const data = { id, content, answer, correctAnswer};
        const url = `http://localhost:8080/api/recordlist/update/${id}`;
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
           onChange={handleQuestionChange}
         />
       </div>
      
      
      

 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
     <button onClick={showForm}>wyswietl</button>
      
      {Array.from(form).map((subArray, index) => {
        return(
          <div key={index}>
            {subArray.map((subItem,i) => {
              return(
                <div key={i}>
                  <input type="text"
                  key={i}
                  name={subItem.name}
                  onChange={updateForm}>

                  </input>
                </div>
              )
            })}
          </div>
        )
      })}
   </div>
 );
}