import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router";
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'




  


   export default function EditTest(){
    
    const [test, setTest] = useState({
      name:""
   });

   const params = useParams();




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




    return (
   
        <div>
          
                      <th>Pytania w teście</th>
        
    
                      {test.questions && Array.from(test.questions).map((test,index) => {
                        return (
                          (test.type == 1 && <p key={index} >{test.content}</p>) || ((test.type == 2 || test.type == 3) && <p key={index}>{test.content2.join(' ')}</p>)
                        )}
                      )}
             
        </div>

        
      );
       
}

