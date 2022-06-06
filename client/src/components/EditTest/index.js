import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router";
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const TestsRecord = (props) => (
    <tr>
      
        <td>{props.test.name}</td>
        <td>{props.test.questions}</td>
        
      
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

  


   export default function EditTest(){


    //const navigate = useNavigate();
    const [data,setData] = useState({
      questions:new Map,
    })


   
    const handleQuestionChange = ({ currentTarget: input }) => {
      setData(data=>({ ...data,  questions:data.questions.set(input.name,input.value)}));

};
  const [pass, setPass] = useState({
  passing:1
  });  

  const [groupChange, setGroupChange] = useState({
    group:""
  });

  const handleChange = ({ currentTarget: input }) => {
    setPass(pass=>({ ...pass, passing:input.value }));
 
  };
    const [records, setRecords] = useState([]);
    const [test, setTest] = useState({
      name:""
   });
    const [groups,setGroups] = useState([]);
  
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
              window.alert(`Record o id ${id} zaktualizowany`);
              window.location.reload(false);	
              //navigate("/testslist");
          })
          .catch((err) => {
              window.alert(`An error has occurred: ${err.message}`);
          });
 
        }
      



    function handlePassSumbit(event) {
      event.preventDefault();
      const id = params.id.toString();
      const passing = pass.passing;
      const submitData = {id,passing};
      const url = `http://localhost:8080/api/testslist/update_group/${id}`;
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
              window.alert(`Record o id ${id} zaktualizowany`);
              window.location.reload(false);	
              //navigate("/testslist");
          })
          .catch((err) => {
              window.alert(`An error has occurred: ${err.message}`);
          });
 
        }
    
    function handleGroupSubmit(event)
    {
      event.preventDefault();
      const id = params.id.toString();
      const group = groupChange.group;
      const submitData = {id,group};
      const url = `http://localhost:8080/api/testslist/update_group/${id}`;
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
          }
          )
          .then((submitData) => {
              window.alert(`Record o id ${id} zaktualizowany`);
              window.location.reload(false);	
              //navigate("/testslist");
          }
          )
          .catch((err) => {
              window.alert(`An error has occurred: ${err.message}`);
          });

    }

    const handleQuestionRemove = async(e) => {
      const id = params.id.toString();
      const question = e.target.value;
      const submitData = {id,question};
      const url = `http://localhost:8080/api/testslist/pull/${id}/${question}`;
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
              window.alert(`Record o id ${id} zaktualizowany`);
              window.location.reload(false);	
              //navigate("/testslist");
          })
          .catch((err) => {
              window.alert(`An error has occurred: ${err.message}`);
          });
    }

    const handleGroupChange = ({ currentTarget: input }) => {
      setGroupChange(groupChange=>({ ...groupChange, group:input.value}));
  };


    return (
   
        <div>
          <Row className="justify-content-md-center" xs="auto" style={{marginTop:"2rem"}}>
            <Col>
            <h2 style={{color:"inherit"}}>Pytania w bazie</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Treść pytania</th>
                </tr>
              </thead>
              <tbody>
                <Form.Select onChange={handleQuestionChange}>
                <option>Wybierz pytanie</option>
                {Array.from(records).map((record,index) => {
                  return(
                    <option key={index} value={record._id}>{ (record.type==1 && record.content) || ((record.type==2 || record.type==3) && record.content2.join(' ')) }</option>
                  )})}
                </Form.Select>
                <Button variant="primary" onClick={handleSubmit} style={{marginTop:"20px"}}>Dodaj</Button>
              </tbody>
            
              
            </Table>
            </Col>
          <Col>
          
          <h2 style={{color:"inherit"}}>Test</h2>
          <Table striped bordered hover size="sm">
              <thead>
                  <tr>
                      <th>Nazwa testu</th>
                      <th>Pkt. zaliczenie/Max.</th>
                      <th>Pytania w teście</th>
                      <th>Akcja</th>
                      <th>Próg zaliczenia</th>
                      <th>Przypisana grupa</th>
                      <th>Przypisz grupe</th>
                  </tr>
              </thead>
              <tbody>{Testlist()}
                  <tr>
                    <td>{test.name}</td>
                    <td>{test.questions && `${test.passing}/${test.questions.length}`}</td>
                    <td>
                      {test.questions && Array.from(test.questions).map((test,index) => {
                        return (
                          (test.type == 1 && <p key={index} >{test.content}</p>) || ((test.type == 2 || test.type == 3) && <p key={index}>{test.content2.join(' ')}</p>)
                        )}
                      )}
                    </td>
                    <td className="d-flex flex-column">
                      {test.questions && Array.from(test.questions).map((test,index) => {
                        return (
                          (<Button key={index} variant="danger" onClick={handleQuestionRemove} style={{marginTop:"0.45rem"}}  value={test._id} size="sm">Usuń</Button>)
                        )})}
                    </td>
                  <td>
                    {test.questions &&
                    <input type="number" name="passing" min="1" max={test.questions.length} value={pass.passing} onChange={handleChange}></input>
                    }
                    <button onClick={handlePassSumbit}>Zapisz</button>
                  </td>
                  <td>
                    {test.group && Array.from(test.group).map((group,index) => {
                      return (
                        <p key={index}>{group.name}</p>
                      )})}
                  </td>
                  <td>
                    <Form.Select onChange={handleGroupChange}>
                      <option>Wybierz grupę</option>
                      {groups && groups.map((group) => {
                        return (
                          <option key={group._id} value={group._id} >{group.name}</option>
                        )
                      })}
                    </Form.Select>
                    <button onClick={handleGroupSubmit}>Zapisz</button>
                    </td>
                  </tr>
                  </tbody>
          </Table>
          </Col>
          </Row>
        </div>

        
      );
       
}

