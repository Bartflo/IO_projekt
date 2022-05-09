import React from 'react'
import {Link} from "react-router-dom";


const Navbar = () => {


    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    return(
        <nav className="navbar">
        <Link to="/" className="logo">Aplikacja</Link>
        <Link to="/recordlist" className="btn_logout">Lista rekordków</Link>
        <Link to="/testslist" className="btn_logout">Lista testów</Link>        
            <Link to="/questions" className="btn_logout">Dodaj pytanie zamknięte</Link>
            <Link to="/questions3" className="btn_logout">Dodaj pytanie wypełnianie</Link>
            <Link to="/questions2" className="btn_logout">Dodaj pytanie kolejność</Link>
            <button className="btn_logout" onClick={handleLogout}>
                Wyloguj
            </button>
        </nav>
    );
};

export default Navbar;