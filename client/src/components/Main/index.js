import React, {useEffect} from 'react'
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Main = () => {

    const user = localStorage.getItem("token");

    const[loggedUser, setLoggedUser] = useState([])
    useEffect(() => {
        async function getUser() {
            try
            {
                const decoded = jwt_decode(user);
                const id = decoded._id
                const response = await fetch(`http://localhost:8080/api/auth/${id}`);

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const actualUser = await response.json();

                setLoggedUser(actualUser);
            }catch(error)
            {
                console.log(error);
            }
        }


        getUser();
        return;
    },[]);


    return (
        <div className="main_container">

            <div className="centered">
                <p>{`Witaj ${loggedUser.firstName} ${loggedUser.lastName}`}</p>
            </div>
        </div>
    );
};

export default Main;
