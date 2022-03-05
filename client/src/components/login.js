import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '.././App.css';


function Login()
{
    return( 
        <div className="login-container">
        <TextField id="outlined-basic" label="Login" variant="outlined"/>
        <TextField sx={{m:2}} id="outlined-password-input" label="Hasło" type="password"/>
        <Button variant="contained">
            Zaloguj się
        </Button>
        <p className="login-to-register">
            Nie masz konta? Rejestracja
        </p>
        </div>
    );
}

export default Login;