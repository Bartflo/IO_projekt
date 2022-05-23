import React, { useEffect } from 'react';
import axios from 'axios';
import {useState} from "react";

const CreateGroup = () => {

    const [data,setData] = useState({
        name: "",
    })
    const [error, setError] = useState("");


    const handleGroupChange = ({ currentTarget: input  }) => {
        setData(data=>({ ...data, name:input.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/group";
            const { data: res } = await axios.post(url, {
                name:data.name,
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


    return(
<div className="main_container">
    <div className="centered">
    <form onSubmit={handleSubmit} className="form_questions" autoComplete='off'>
            <h2>Wpisz nazwę grupy</h2>
            <input className="login_register_input"
                    type="text"
                    placeholder="Nazwa grupy"
                    name="name"
                    onChange={handleGroupChange}
                    required
                    />
            <button type="submit" className="btn_login_register">
                Utwórz grupę
            </button>
        </form>
    </div>
</div>
    )

};


export default CreateGroup;