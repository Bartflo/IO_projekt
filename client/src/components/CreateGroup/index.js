import React, { useEffect } from 'react';
import {useState} from "react";
import Autocomplete from "./Autocomplete";
import "./styles.css";

const CreateGroup = () => {

    const [records,setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8080/api/group/seeuser`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);

        }

        getRecords();

        return;
    }, [records.length]);


    return(
        <div className="wrapper">
      <h1>Stwórz grupe</h1>
    
      <Autocomplete
      suggestions={records.map((record) => {
          return record.firstName +" "+ record.lastName;
      })}
      />
    </div>
    )

};


export default CreateGroup;