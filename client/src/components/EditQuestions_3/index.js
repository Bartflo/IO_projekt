import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
const Edit = () => {
 const [form, setForm] = useState({
   content2: new Map,
   correctAnswer:new Map,
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
       navigate("/recordlist");
       return;
     }
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 


//handle form change
  const handleQuestionChange = ({ currentTarget: input }) => {
  setForm(form=>({ ...form, content2:input.value.split(" ")}));
  };	


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
        const content2 = form.content2;
        const correctAnswer = [...data.correctAnswer.values()];
        const submitData = { id, content2, correctAnswer};
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
           value={Array.from(form.content2).join(" ")}
           onChange={handleQuestionChange}
         />
         <h1>Odpowiedzi</h1>
         <div>
        	{Array.from(form.content2).map((subArray, index) => {
          return (
            <div key={index} className="showing_buttons">
					<div key={index} className="correctAnswer_container action">
						<label>
							<input type="checkbox" key={index} value={index} name={form.content2[index]} onChange={handleCorrectAnswerChange}/><span>{form.content2[index]}</span>
						</label>
					</div>
            </div>
          );
        		})}
     	 </div>
      
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