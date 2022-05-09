import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";



const TestsRecord = (props) => (
    <tr>
      
        <td>{props.test._id}</td>
        <td>{props.test.name}</td>
      
        
      
    </tr>
   );

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
   
        
      
    </tr>
   );

   export default function RecordList() {
    const [records, setRecords] = useState([]);
    const [test, setTest] = useState([]);
    const params = useParams();
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
    
    useEffect(() => {
        async function getTest() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:8080/api/testslist/${id}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const test = await response.json();
            
            setTest(test);
        }

        getTest();
        return;
    }, );

       function Testlist() {
        return Array.from(test).map((test) => {
            return (
                <TestsRecord
                test={test}
                key={test._id}
                />
                )
            })
         }

    // This method will map out the records on the table
    function recordList() {
      return records.map((record) => {
        return (
          <Record
            record={record}
            key={record._id}
          />
        )
      });
    }
    return (
   
        <div>
          <table className="table">
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
          </table>
        
        <table className="table">
            <thead>
                <tr>
                    <th>Nazwa testu</th>
                </tr>
            </thead>
            <tbody>{Testlist()}</tbody>
        </table>
        </div>

        
      );
       
}