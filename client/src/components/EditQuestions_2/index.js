import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
const Edit = () => {
 const [form, setForm] = useState({
   content2: new Map,
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
    //  setQuestions(form.answer);
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 

const [data, setData] = useState({
    content2: "",
});


//handle form change
  const handleQuestionChange = ({ currentTarget: input }) => {
  setData(data=>({ ...data, content2:input.value.split(" ") }));
  };	

    //handle form submit
    function handleSubmit(event) {
        event.preventDefault();
        const id = params.id.toString();
        const content2 = data.content2;
        const submitData = { id, content2};
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
    {console.log(form.content2)}
     <form onSubmit={handleSubmit} className="form_questions">
         <label htmlFor="name">Treść pytania: </label>
         <input
           type="text"
           className="login_register_input"
           id="content"
           defaultValue={Array.from(form.content2).join(" ")}
           onChange={handleQuestionChange}
         />
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