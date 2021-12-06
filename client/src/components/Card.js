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

import {SAVE_MTGCARD} from "../utils/mutations"
import { useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    padding: '10px',
    margin: '10px',
  }
}))

export default function MakeCard({card}) {
  const [saveCard, {error}] = useMutation(SAVE_MTGCARD);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)

  async function handleAddCard() {
    console.log("clicked add for" + card.name)
    try {
      const dataToSave = card;
      dataToSave.quantity = 1;
      console.log(dataToSave);
      
      const data = await saveCard({
        variables: {MTGCardData: {...dataToSave}},
      });
      console.log(data);
      } catch (err) {
      console.error(err);
      console.log("error on save")
    }
  }

  function showAdd() {
    if (Auth.loggedIn()) {
      return (
        <Button size="small"
        onClick={handleAddCard}>Add</Button>
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
        <br/>
        {/* {
        <Typography variant="caption" color="text.secondary">
          {addQuant}
        </Typography>
        } */}
        {/* <br/>
        <Typography variant="caption" color="text.secondary">
          Type: {card.types}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          Rarity: {card.rarity}
        </Typography> */}
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
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
        number={card.number}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
      </Popup>
    </Card>
  );
}