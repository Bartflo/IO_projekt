import TextField from '@mui/material/TextField';


function Login()
{
    return( 
        <div className="test">
        <TextField id="outlined-basic" label="Login" variant="outlined"/>
        <TextField id="outlined-password-input" label="Password" type="password"/>
        </div>
    );
}

export default Login;