import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Record = (props) =>(
    <tr>
        <td>{props.record.name}</td>
    </tr>
)

export default function RecordList(){
    const [records, setRecords] = useState([]);

    //fetch records from database
    useEffect(() =>{
        async function getRecords(){
            const response = await fetch('http://localhost:5000/record');
            
            if(!response.ok)
            {
                const message = `Error: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        
        return;

    }, [records.length]);

    //map out records on table
    function recordList(){
        return records.map((record)=>{
            return(
                <Record
                record={record}
                key={record._id}
                />
            );
        });
    }

    //display table
    return(
    <div>
        <h2>Rekordy w bazie</h2>
        <table style={{marginTop:20}}>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            
            <tbody>{recordList()}</tbody>
        </table>
        <Link to="/create">Dodaj nowy rekord</Link>
    </div>
    );
}