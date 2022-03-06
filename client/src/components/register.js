import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '.././App.css';
import {Link} from "react-router-dom";

function Register()
{
    return( 
        <div className="login-container">
        <TextField sx={{m:2}}id="outlined-basic" label="Imię i Nazwisko" variant="outlined"/>
        <TextField  id="outlined-basic" label="Email" variant="outlined"/>
        <TextField sx={{m:2}} id="outlined-password-input" label="Hasło" type="password"/>
        <TextField id="outlined-password-input" label="Powtórz hasło" type="password"/>
        <Button sx={{m:2}} variant="contained">
            Zarejestruj się
        </Button>
        <p className="login-to-register">
            Masz już konto? <Link to="/">Zaloguj się</Link>
        </p>
        </div>
    );
}

export default Register;