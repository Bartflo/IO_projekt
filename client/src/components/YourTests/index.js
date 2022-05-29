import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
    <td>
      <Link className="btn_edit" to={`/test_solve/${props.record._id}`}>Rozwiąż</Link>
    

   </td>
       
 </tr>
);
 
export default function YourTests() {
 const [records, setRecords] = useState([]);
 const [groups,setGroups] = useState([]);
 
 // This method fetches the records from the database.
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

 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
       
         key={record._id}
       />
     );
   });
 }

 // This following section will display the table with the records of individuals.
 return (
   
   <div>
     <Table striped bordered hover size="sm">
       <thead>
         <tr>
           <th>Nazwa testu</th>
           <th>Akcja</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </Table>
   </div>
 );
}