import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import jwt_decode from "jwt-decode";


export default function YourTests() {
 const [records, setRecords] = useState([]);
 const [groups,setGroups] = useState([]);

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

 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:8080/api/testslist`);
 
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
 
 useEffect(() => {
  async function getGroup() {
    const response = await fetch(`http://localhost:8080/api/group/see`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const groups = await response.json();
    setGroups(groups);
  }

  getGroup();

  return;
}, [groups.length]);

 if(records.length != 0)
 {
     console.log(records[0].group)
 }

 return (
   
   <div>
     <Table striped bordered hover size="sm">
       <thead>
         <tr>
           <th>Nazwa testu</th>
           <th>Akcja</th>
         </tr>
       </thead>
       <tbody>
       {records.map((record,index) => {
            return(
                <>

               {record.group.map((group,index) => {
                   {console.log(group.peoples)}
                   {console.log(JSON.stringify(loggedUser._id))}
                   if(group.peoples.includes(loggedUser._id)) {
                       return (
                           <tr key={index}>
                               <td>{record.name}</td>
                               <td><Link className="btn_edit" to={`/test_solve/${record._id}`}>Otwórz</Link></td>
                           </tr>
                       )
                   }
               })}
               </>
            )

       })}
       </tbody>
     </Table>
   </div>
 );
}