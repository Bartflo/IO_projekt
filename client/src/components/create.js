import React, {useState} from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";


export default function Create(){
    const [form,setForm] = useState({
        name:"",
    });

    const navigate = useNavigate();

    //update state

    function updateForm(value){
        return setForm((prev)=>{
            return{...prev,...value};
        });
    }

    async function onSubmit(e){
        e.preventDefault();

        //when POST is sent to create url, add record to db

        const newPerson = {...form};

        await fetch("http://localhost:5000/record/add",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error =>{
            window.alert(error);
            return;
        });
        setForm({name: ""});
        navigate("/");
    }

    //form

    return(
        <div>
            <h3>Stworz nowy rekord</h3>
            <form onSubmit={onSubmit}>
                <input type="text" id="name" value={form.name} onChange={(e)=>updateForm({name: e.target.value})}/>    
            
                <input type="submit" value="Dodaj rekord"/>
            </form>
            <Link to="/record">Rekordy</Link>
        </div>
    )
}