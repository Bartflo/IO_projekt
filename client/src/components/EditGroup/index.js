import React, { useEffect } from 'react';
import {useState} from "react";
import {useParams} from "react-router";
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const EditGroup = () => {

    const [users,setUsers] = useState([]);
    const [group,setGroup] = useState([]);
    const [data,setData] = useState({
        peoples:"",
    });
    const params = useParams();
    

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:8080/api/group/seeuser`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const users = await response.json();
            setUsers(users);

        }

        getUsers();

        return;
    }, [users.length]);

    useEffect(() => {
        async function getGroup() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:8080/api/group/${id}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const group = await response.json();
            
            setGroup(group);
        }

        getGroup();
        return;
    },);

    const handleUserChange = ({ currentTarget: input  }) => {
        setData(data=>({ ...data, peoples:input.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = params.id.toString();
        const peoples = data.peoples;
        const submitData = {id,peoples};
        const url = `http://localhost:8080/api/group/update/${id}`;
        const options = {
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData),
        };
        fetch(url,options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(submitData => {
                window.alert(`Record o id ${id} zaktualizowany`);
                // window.location.reload(false);
            })
            .catch(err => {
                window.alert(`An error has occurred: ${err.message}`);
            });
    };

 //remove user from array of users using /api/group/pull/:id/:user
    const handleRemoveUser = async (e) => {
        e.preventDefault();
        const id = params.id.toString();
        const user = e.target.value;
        const submitData = {id,user};
        const url = `http://localhost:8080/api/group/pull/${id}/${user}`;
        const options = {
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData),
        };
        fetch(url,options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(submitData => {
                window.alert(`Użytkownik ${user} usunięty z grupy ${id}`);
            })
            .catch(err => {
                window.alert(`An error has occurred: ${err.message}`);
            });
    };


    
        

    return(
    <div>

        
        
        <Row className="justify-content-md-center" xs="auto" style={{marginTop:"2rem"}}>
        <Col>
            <h3>Użytkownicy w grupie</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    {group.peoples && Array.from(group.peoples).map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="danger" value={user._id} onClick={handleRemoveUser}>Usuń</Button>
                            </td>




                        </tr>
                    ))}
                </tbody>
            </Table>


        </Col>
        <Col xs={3}>
                <Form.Select onChange={handleUserChange}>
                    <option>Wybierz osobę</option>



                    {group.peoples && Array.from(group.peoples).map(group => {
                        return(
                            <>
                                {users && Array.from(users).map((user,index) => {
                                    return(
                                        <>
                                            {group._id.includes(user._id) ?(
                                                <option key={index} value={user._id} disabled>{user.firstName} {user.lastName}</option>
                                            ) :
                                                (
                                                    <option key={index} value={user._id}>{user.firstName} {user.lastName}</option>
                                                )
                                            }
                                        </>
                                    )
                                })
                                }

                            </>
                        )
                    })
                    }
                    </Form.Select>
                <Button variant="primary" onClick={handleSubmit} style={{marginTop:"20px"}}>Dodaj</Button>
        </Col>
        </Row>
    </div>
    )

};


export default EditGroup;