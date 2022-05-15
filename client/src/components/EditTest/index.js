import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router";
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const TestsRecord = (props) => (
    <tr>
      
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
      <td>
        <input type="checkbox" value={props.record._id} onChange={props.handleQuestionChange}
        name={props.record._id}></input>
      </td>
      <td>
        {props.record._id}
      </td>
        
    </tr>
   );




   export default function EditTest(){


    const navigate = useNavigate();
    const [data,setData] = useState({
      questions:new Map,
    })

    const handleQuestionChange = ({ currentTarget: input }) => {
  setData(data=>({ ...data,  questions:data.questions.set(input.name,input.value)}));
  console.log(data.questions)
};



    const [records, setRecords] = useState([]);
    const [test, setTest] = useState({
      name:""
   });
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


    function handleSubmit(event) {
      event.preventDefault();
      const id = params.id.toString();
      const questions = [...data.questions.values()]
      const submitData = {id,questions};
      const url = `http://localhost:8080/api/testslist/update/${id}`;
      const options = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
      };
      fetch(url, options)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(response.statusText);
              }
              return response.json();
          })
          .then((submitData) => {
              window.alert(`Record with id ${id} updated`);
              navigate("/testslist");
          })
          .catch((err) => {
              window.alert(`An error has occurred: ${err.message}`);
          });
 
        }
      

    return (
   
        <div>
        <Container>
          <Row xs="auto">
            <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Treść pytania</th>
                  <th>Odpowiedzi</th>
                  <th>Poprawne odpowiedzi</th>
                  <th>Typ pytania</th>
                  <th>Czy dodać?</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>{recordList()}</tbody>
            </Table>
            </Col>
            <Col>
          <Button style={{marginTop:200}} variant="outline-primary" onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="15" y1="16" x2="19" y2="12" />
            <line x1="15" y1="8" x2="19" y2="12" />
            </svg>
          </Button>{' '}
          
          </Col>
          <Col>
          

          <Table striped border hover size="sm">
              <thead>
                  <tr>
                      <th>Nazwa testu</th>
                  </tr>

              </thead>
              <tbody>{Testlist()}
                  <tr>
                    <td><p>{test.name}</p></td>
                  </tr>
                  </tbody>
          </Table>
          </Col>
          </Row>
        </Container>
        </div>

        
      );
       
}

