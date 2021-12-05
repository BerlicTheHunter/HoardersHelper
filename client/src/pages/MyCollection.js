import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '../components/Card'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

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
  },
  backaway:{
    padding: '10px',
    margin: '10px',
  },
}));


export default function MyCollection() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const classes = useStyles();
  const [cardData, setCardData] = useState(userData.mtgCard);
  const [searchName, setSearchName] = useState('');
  const [searchSet, setSearchSet] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => { 
    if(searchName || searchSet){
      generateCardData(); 
    }  
  }, [pageNumber]); 

  useEffect(() => { 
    window.scrollTo(0, 0);  
  }, [cardData]); 

  const generateCardData = ()=>{
    setCardData(userData.mtgCard)
  }
  
  const handleCardSearch = (event)=>{ 
    if(searchName || searchSet){
      event.preventDefault();
      generateCardData();
    }
  }

  const previousPage = (event) =>{
    if(pageNumber > 1){
      let newPage = pageNumber - 1;
      setPageNumber(newPage);
    }
  };

  const nextPage = (event) =>{
    if(cardData.length === 20){
      let newPage = (pageNumber + 1);
      setPageNumber(newPage);
    };
  };

  return (
    <Container maxWidth='xl' align="center">
      <Typography variant='h4' componenet="div" maxWidth="83%">
        That's Quite A Hoard You've Got There
      </Typography>
      <br/>
      {/* <form   className={classes.root} noValidate autoComplete="off" alignItems="center"onSubmit={handleCardSearch}>
        <TextField 
          id="searchName" 
          label="Search by Card Name" 
          type="search" 
          variant="standard"
          InputProps={{style: {color: textColor}}}
          color="secondary"
          margin="normal"
          onChange={(event)=> setSearchName(event.target.value)} 
        />
        <TextField className={classes.search}
          id="searchSet" 
          label="Search by Card Set" 
          type="search" 
          variant="standard"
          InputProps={{style: {color: textColor}}}
          color="secondary"
          margin="normal"
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
      </form> */}
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
      {cardData.length > 0 &&
        <Stack direction="row" spacing={10} alignItems="center" justifyContent="center" >
          {pageNumber > 1 &&
            <IconButton aria-label="Previous Page"
            onClick={previousPage}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
          }
          <Typography >{pageNumber}</Typography>
          {cardData.length === 20 &&
            <IconButton aria-label="Next Page"
            onClick={nextPage}>
              <ArrowForwardIosRoundedIcon/>
            </IconButton>
          }
        </Stack>
      }
    </Container>
  )
}