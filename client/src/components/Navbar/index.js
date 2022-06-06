import React from 'react'
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation_bar_user = () => {


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return(
        <Navbar collapseOnSelect expand="lg" bg="priamry" variant="dark">
            <Container>
                <Navbar.Brand><Link to="/" style={{textDecoration:"none",color:"inherit"}}>Aplikacja</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/your_tests" style={{textDecoration:"none",color:"inherit"}}>Testy do rozwiązania</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <button className="btn_logout" onClick={handleLogout}>
                                Wyloguj
                            </button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default Navigation_bar_user;