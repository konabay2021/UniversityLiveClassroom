import React, { useState, useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from "../history"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CUHK Live Classroom
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(10),
  },
}));


let SignUp = (props) => {
  const classes = useStyles();

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [pw, setpw] = useState('');
  const [repw, setrepw] = useState('');
  const [pwErrorMessage, setpwErrorMessage] = useState('');

  // useEffect(() => {

  // });


  let handleSubmit = () => {
    if ( firstname.length > 0 && lastname.length > 0 && username.length > 0 && validateEmail() && pw.length > 0 && pwErrorMessage.length === 0  )
    {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          'firstname': firstname,
          'lastname': lastname,
          'username' : username,
          'email':email,
          'pw':pw
        })
      };
      fetch('/api/createAC', requestOptions)
        .then(response => response.json())
        .then(response => {
          const { history } = props;
          if(response._id){
            alert("Success!!");
            HandleMapSateToProps(response)
            history.push('/login');
          }
          else{
            alert("user/email exists already!");
          }
        });
    }
  
  }

  let HandleMapSateToProps = (studentDetails) =>{
    // stateDispatch({ type: 'ADD_TOKEN', payload: { 'token': token} })
    // localStorage.setItem( 'info', JSON.stringify(studentDetails) )
    // localStorage.setItem( 'token', studentDetails._id )
    
    // console.log(  localStorage.getItem( "token" ) )
  }

  let validateEmail = () => {
    var re = /\S+@\S+\.\S+/
    if(re.test(String(email).toLowerCase())){
      return true
    }
    return false
}

  let setandcheckrepw = (event) => {

    setrepw(event.target.value)
    if (event.target.value !== pw) {
      setpwErrorMessage("pw is not the same!")
    } else {
      setpwErrorMessage("")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={event => { setfirstname(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={event => { setlastname(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={event => { setusername(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={event => { setemail(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pw}
                onChange={event => { setpw(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="ppassword"
                autoComplete="confirm-password"
                value={repw}
                onChange={setandcheckrepw}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel >
                <div>{!validateEmail() && "please enter true eamil" }</div>
              </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <FormLabel >
                <div>{pwErrorMessage}</div>
              </FormLabel>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ handleSubmit }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default  SignUp