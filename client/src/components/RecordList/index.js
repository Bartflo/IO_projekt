import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'
const Record = (props) => (
 <tr>
   {(props.record.type==1 && <td>{props.record.content}</td>) || ((props.record.type==2 || props.record.type==3) && <td>{props.record.content2.join(' ')}</td>)}
   {/* <td>{props.record.answer}</td> */}
    <td>
   {(props.record.type==1 && Array.from(props.record.answer).map((answer, index) => (
      <p key={index}>{answer}</p>
    ))) || ((props.record.type==2 || props.record.type==3) && <p style={{color:"red"}}>Nie dotyczy</p>)}
    </td>
    {/* {props.record.correctAnswer} */}
   <td>
     {(props.record.type==1 && Array.from(props.record.correctAnswer).map((correctAnswer,index)=>
     <p key={index}>{props.record.answer[correctAnswer]}</p>)) || 
     (props.record.type==3 && Array.from(props.record.correctAnswer).map((correctAnswer,index)=>
     <p key={index}>{props.record.content2[correctAnswer]}</p>))|| 
     (props.record.type==2 && <p style={{color:"red"}}>Nie dotyczy</p>)}
   </td>
    {(props.record.type==1 && <td>Wielokrotnego wyboru</td>) || (props.record.type==2 && <td>Odpowiednia kolejność</td>) || (props.record.type==3 && <td>Uzupełnianie luk</td>)}

      <td>
     {(props.record.type==1 && <Link className="btn_edit" to={`/edit_1/${props.record._id}`}>Edit</Link>) || (props.record.type==2 && <Link className="btn_edit" to={`/edit_2/${props.record._id}`}>Edit</Link>)
     || (props.record.type==3 && <Link className="btn_edit" to={`/edit_3/${props.record._id}`}>Edit</Link>)} 
     <button className="btn_delete_answer"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
   
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:8080/api/recordlist`);
 
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
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:8080/api/recordlist/delete/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
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
           <th>Treść pytania</th>
           <th>Odpowiedzi</th>
           <th>Poprawne odpowiedzi</th>
           <th>Typ pytania</th>
           <th>Akcja</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </Table>
   </div>
 );
}