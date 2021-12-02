import React from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

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
    height: "70vh",
    width: 280,
    margin: "20px auto",
    background: backgroundColor,
  };
  const avatarStyle = { backgroundColor: accentRed };
  const btnstyle = { margin: "8px 0", background: accentBlue };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          id="Username"
          label="Username"
          placeholder="Enter username"
          InputProps={{ style: { color: backgroundMain } }}
          defaultValue="Normal"
          variant="filled"
          margin="normal"
          fullWidth
          required
        />
        <div/>
        <TextField
          id="Password"
          label="Password"
          placeholder="Enter password"
          type="password"
          InputProps={{ style: { color: backgroundMain } }}
          defaultValue="Normal"
          variant="filled"
          margin="normal"
          fullWidth
          required
        />
        <Button
          className={classes.button}
          type="submit"
          color="accentBlue"
          variant="contained"
          fullWidth
          endIcon={<LoginOutlinedIcon/>}
        >
          Sign in
        </Button>
        <Typography>
          {" "}
          Do you have an account ?
          <br />
          <Link href="">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
