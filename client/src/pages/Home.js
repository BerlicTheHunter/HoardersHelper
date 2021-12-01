import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '../components/Card'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@mui/material/Typography';
const mtg = require('mtgsdk');

const backgroundColor = '#757778'
const backgroundMain ='#535455'
const textColor = '#FCFAFA'
const accentBlue = '#68D8D6'
const accentRed = '#7B0828'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      height: '5ch',
      display: 'inline-flex',
      color: textColor,
    },
  },
  button: {
    marginTop: theme.spacing(2),
    background: accentBlue,
  },
  results:{
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  multilineColor:{
    color: 'white',
  }
}));

export default function Home() {
  const classes = useStyles();
  const [cardData, setCardData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSet, setSearchSet] = useState('');
  
  const handleCardSearch = (event)=>{ 
    event.preventDefault();
    if(searchName != ''){
      mtg.card.where({name: searchName})
      .then( card => {
      const searchData = card.map((card) => ({
        name: card.name,
        cmc: card.cmc,
        colors: card.colors,
        colorIdentity: card.colorIdentity,
        type: card.type,
        types: card.types,
        subtypes: card.subtypes,
        set:card.set,
        setName: card.setName,
        number:card.number,
        imageUrl: card.imageUrl,
        rarity:card.rarity,
        mvId:card.multiverseid,
        id:card.id
        }))
      setCardData(searchData)
      console.log(searchData.length)
      });
    }
    else if(searchSet != ''){
      mtg.card.where({setName: searchSet})
      .then( card => {
      const searchData = card.map((card) => ({
        name: card.name,
        cmc: card.cmc,
        colors: card.colors,
        colorIdentity: card.colorIdentity,
        type: card.type,
        types: card.types,
        subtypes: card.subtypes,
        set:card.set,
        setName: card.setName,
        number:card.number,
        imageUrl: card.imageUrl,
        rarity:card.rarity,
        mvId:card.multiverseid,
        id:card.id
        }))
      setCardData(searchData)
      console.log(searchData.length)
      });
    }
    
  }
  return (
     
      
    <Container maxWidth='sm'>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleCardSearch}>
        <TextField 
          id="searchName" 
          label="Search by Card Name" 
          type="search" 
          variant="standard"
          InputProps={{style: {color: textColor}}}
          color="secondary"
          Change={(event)=> setSearchName(event.target.value)} 
        />
        <TextField className={classes.search}
          id="searchSet" 
          label="Search by Card Set" 
          type="search" 
          variant="standard"
          color="secondary"
          onChange={(event)=> setSearchSet(event.target.value)} 
        />    
        <Button className={classes.button}
          variant="outlined"
          onClick={()=> console.log("Search Clicked")}
          type="submit"
          color="textColor"
          endIcon={<SearchIcon/>}
        >
          Search
        </Button>
      </form>
      <Typography variant="caption" color="textColor" className={classes.results}>
          Displaying {cardData.length} Cards
      </Typography>
      <Grid container className={classes.results}>
        {cardData.map(card =>(
          <Grid item key={card.id} xs={12} md={4} lg={3}>
            <Card card={card}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}