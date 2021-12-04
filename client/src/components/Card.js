import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Auth from "../utils/auth";

export default function MakeCard({card}) {
  
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