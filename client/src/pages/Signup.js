import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
// import Alert from '@material-ui/core/Alert'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const backgroundColor = "#d2d8db";
const backgroundMain = "#535455";
const textColor = "#FCFAFA";
const accentBlue = "#68D8D6";
const accentRed = "#7B0828";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      fontWeight: 500,
      background: accentBlue,
    },
    button: {
      margin: "8px 0",
      background: accentBlue,
    },
    background: {
        background: backgroundColor
    }
  };
});

export default function Login() {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 320,
    margin: "20px auto",
    background: backgroundColor,
  };
  const avatarStyle = { backgroundColor: accentRed };
  
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  useEffect(() => {
    if(error){
      setShowAlert(true);
    }
    else{
      setShowAlert(false);
    }
  },
  [error]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log("We tried to sign you in")
      console.log(userFormData)
      const {data} = await addUser({
        variables: userFormData
      });
      console.log(data);
      await Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const BlueColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#58b7b5',
    '&:hover': {
      backgroundColor: '#4d9f9e',
    },
  }));

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Create An Account</h2>
        </Grid>
        <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* <Alert severity="error" dismissible onClose={() => setShowAlert(false)} show={showAlert} >
          🔥🔥You have failed to pass the GATE!! Try your Login again.🔥🔥
        </Alert> */}
        <TextField
          id="username"
          label="Username"
          name="username"
          InputProps={{ style: { color: backgroundMain } }}
          variant="filled"
          color="secondary"
          margin="normal"
          type="text"
          fullWidth
          required
          onChange={handleInputChange}
          value={userFormData.username}
        />
        <TextField
          id="email"
          label="Email"
          name="email"
          InputProps={{ style: { color: backgroundMain } }}
          variant="filled"
          color="secondary"
          margin="normal"
          type="text"
          fullWidth
          required
          onChange={handleInputChange}
          value={userFormData.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          InputProps={{ style: { color: backgroundMain } }}
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          required
          onChange={handleInputChange}
          value={userFormData.password}
        />
        <BlueColorButton
          className={classes.button}
          type="submit"
          color="accentBlue"
          variant="contained"
          fullWidth
          // endIcon={<LoginOutlinedIcon/>}
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        >
         🚪Enter the Gates🚪
        </BlueColorButton>
        </form>
        <Typography align="center">
          {" "}
          Have you started building your Hoard?
          <br />
          <Link href="./Login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
