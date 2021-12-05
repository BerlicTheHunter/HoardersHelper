import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const backgroundColor = '#757778'
const backgroundMain ='#535455'
const backgroundBox ='#d2d8db'
const textColor = '#FCFAFA'
const accentBlue = '#68D8D6'
const accentRed = '#7B0828'

const useStyles = makeStyles((theme) => ({ 
    dialogLocation: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        position: 'absolute',
        top: theme.spacing(2), 
    },
    button: {
        background: accentRed,
        color: textColor,
        padding: '10px',
        margin: '10px',
    },
}))

export default function Popup({ title, setName, image, type, rarity, openPopup, setOpenPopup }) {

    const classes = useStyles();
    const dialogStyle = {
        background: backgroundBox,
      };

    return (
        <Dialog open={openPopup} width='md' classes={{paper: classes.dialogLocation}} style={{dialogStyle}} align="center">
            <Button 
                className={classes.button}
                variant="contained"
                color="textColor"
                onClick={() => setOpenPopup(false)}
                size="small"
            >
                Exit
            </Button>
            <div>
                <img 
                src={image}
                alt="{title} image" 
                width="300"
                height="auto"
                margin="10px" 
                />
            </div>
            <DialogTitle>
                <div style={{display: "flex"}}>
                    <Typography variant="h5" component="div" style={{flexGrow:2}}>
                        {title}
                    </Typography>
                </div>                
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <Typography variant="p" component="div" align='center'>
                        From the set: {setName}
                    </Typography>
                    <Typography variant="p" component="div" align='center'>
                        Type: {type}
                    </Typography>
                    <Typography variant="p" component="div" align='center'>
                        Rarity: {rarity}
                    </Typography>
                </div>
            </DialogContent>
        </Dialog>
    )
}