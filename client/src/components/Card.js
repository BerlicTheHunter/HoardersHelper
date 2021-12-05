import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Auth from "../utils/auth";
import Popup from '../components/Popup'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    padding: '10px',
    margin: '10px',
  }
}))

export default function MakeCard({card, children}) {

  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)
  
  function showAdd() {
    if (Auth.loggedIn()) {
      return (
        <Button size="small">Add</Button>
      )
    }
  }

  if(card.imageUrl == undefined) {
    card.imageUrl = "https://i.imgur.com/LdOBU1I.jpg"
  };
  
  return (
    <Card sx={{ maxWidth: 300 }} className={classes.cardStyle}>
      <CardMedia 
        component="img"
        height="25%"
        width="auto"
        image={card.imageUrl} 
        alt={card.name}
      />
      <CardContent>
        <Typography  variant="h6" component="div" align='center'>
          {card.name}
        </Typography>
        {/* <Typography variant="caption" color="text.secondary">
          Card Set: {card.setName}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          Type: {card.types}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          Rarity: {card.rarity}
        </Typography> */}
      </CardContent>
      <CardActions>
        {showAdd()}
        <Button 
          size="small"
          onClick={() => setOpenPopup(true)}
        >
          Learn More
        </Button>
      </CardActions>
      <Popup
        title = {card.name}
        setName = {card.setName}
        image={card.imageUrl}
        type={card.type}
        rarity={card.rarity}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {children}
      </Popup>
    </Card>
  );
}