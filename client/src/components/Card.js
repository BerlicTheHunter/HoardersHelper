import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Auth from "../utils/auth";
import {SAVE_MTGCARD} from "../utils/mutations"
import { useMutation } from '@apollo/client';

export default function MakeCard({card}) {
  const [saveCard, {error}] = useMutation(SAVE_MTGCARD);


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
      console.log(err);
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
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia 
        component="img"
        height="25%"
        width="auto"
        image={card.imageUrl} 
        alt={card.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {card.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Card Set: {card.setName}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          Type: {card.types}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          Rarity: {card.rarity}
        </Typography>
      </CardContent>
      <CardActions>
        {showAdd()}
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}