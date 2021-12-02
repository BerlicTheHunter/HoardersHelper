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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
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
    height: "60vh",
    width: 320,
    margin: "20px auto",
    background: backgroundColor,
  };
  const avatarStyle = { backgroundColor: accentRed };
  
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* <Alert severity="error" dismissible onClose={() => setShowAlert(false)} show={showAlert} >
          🔥🔥You have failed to pass the GATE!! Try your Login again.🔥🔥
        </Alert> */}
        <TextField
          id="email"
          label="Email"
          InputProps={{ style: { color: backgroundMain } }}
          defaultValue="Normal"
          variant="filled"
          color="secondary"
          margin="normal"
          type="text"
          fullWidth
          required
          onChange={handleInputChange}
          // value={userFormData.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          InputProps={{ style: { color: backgroundMain } }}
          defaultValue="Normal"
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          required
          onChange={handleInputChange}
          // value={userFormData.password}
        />
        <Button
          className={classes.button}
          type="submit"
          color="accentBlue"
          variant="contained"
          fullWidth
          endIcon={<LoginOutlinedIcon/>}
          // disabled={!(userFormData.email && userFormData.password)}
        >
         🚪Enter the Gates🚪
        </Button>
        </form>
        <Typography>
          {" "}
          Have you started building your Hoard?
          <br />
          <Link href="">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
