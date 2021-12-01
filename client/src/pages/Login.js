import React from 'react';
import { makeStyles } from '@material-ui/core'

const backgroundColor = '#757778'
const backgroundMain ='#535455'
const textColor = '#FCFAFA'
const accentBlue = '#68D8D6'
const accentRed = '#7B0828'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      fontWeight: 500,
      background: accentBlue,
    },
  }
});

export default function Login() {
    const classes = useStyles();
    return (
        <div>
            Login Page
        </div>
    )
}