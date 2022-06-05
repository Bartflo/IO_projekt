import React from 'react'
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation_bar = () => {


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
            <Nav.Link><Link to="/recordlist" style={{textDecoration:"none",color:"inherit"}}>Rekordy</Link></Nav.Link>
            <Nav.Link><Link to="/testslist" style={{textDecoration:"none",color:"inherit"}}>Testy</Link></Nav.Link>
            <Nav.Link><Link to="group_list" style={{textDecoration:"none",color:"inherit"}}>Grupy</Link></Nav.Link>
            <Nav.Link><Link to="/your_tests" style={{textDecoration:"none",color:"inherit"}}>Testy do rozwiązania</Link></Nav.Link>
            <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="/questions" style={{textDecoration:"none",color:"inherit"}}>Pytanie zamknięte</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/questions2" style={{textDecoration:"none",color:"inherit"}}>Pytanie kolejność</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/questions3" style={{textDecoration:"none",color:"inherit"}}>Pytanie wypełnianie</Link></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Stwórz" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="/create_group" style={{textDecoration:"none",color:"inherit"}}>Grupa</Link></NavDropdown.Item>

            </NavDropdown>
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

        // <nav className="navbar">
        // <Link to="/" className="logo">Aplikacja</Link>
        // <Link to="/recordlist" className="btn_logout">Lista rekordków</Link>
        // <Link to="/testslist" className="btn_logout">Lista testów</Link>        
        //     <Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
        //     <Link to="/questions3" className="btn_logout">Dodaj pytanie wypełnianie</Link>
        //     <Link to="/questions2" className="btn_logout">Dodaj pytanie kolejność</Link>
            
        // </nav>
    );
};

export default Navigation_bar;