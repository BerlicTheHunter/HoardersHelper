import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useNavigate, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
//import Container from '@material-ui/core/Container'
import HHLogo from '../image/hh_logo_test.png'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";

const drawerWidth = 240
const backgroundColor = '#535455'
const backgroundMain = '#757778'
const textColor = '#FCFAFA'
const accentBlue = '#68D8D6'
const accentRed = '#7B0828'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: backgroundMain,
      // backgroundImage: "url('https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1593814681464-eef5af2b0628%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1170%26q%3D80')",
      width: '100%',
      height: '100%',
      padding: theme.spacing(3),
      color: textColor,
      fontWeight: 500,
    },
    root: {
      display: 'flex',
      fontWeight: 500,
      background: backgroundColor,
    },
    drawer: {
      paddingTop: 20,
      width: drawerWidth,
      background: backgroundColor,
      color: textColor,
    },
    drawerPaper: {
      width: drawerWidth,
      background: backgroundColor,
      color: textColor,
      fontWeight: 500,
    },
    drawerPaperIcon: {
      color: accentRed,
    },
    active: {
      background: accentBlue,
      color: accentRed,
      fontWeight: 800,
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: backgroundColor,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    },
    footBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: backgroundColor,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      fontStyle: 'italic',
    },
  }
})

export default function Layout({ children }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, data } = useQuery(QUERY_ME);
  

  const menuItems = [
    {
      text: "Search",
      icon: <SubjectOutlined color="accentBlue" />,
      path: "/",
    },
    {
      text: "Login",
      icon: <AddCircleOutlineOutlined color="accentBlue" />,
      path: "/Login",
    },
    {
      text: "Signup",
      icon: <AddCircleOutlineOutlined color="accentBlue" />,
      path: "/Signup",
    },
    {
      text: "My Collection",
      icon: <AddCircleOutlineOutlined color="accentBlue" />,
      path: "/mycollection",
    },
  ];

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: accentRed,
    '&:hover': {
      backgroundColor: '#552a2a',
    },
  }));

  function addUsername() {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    const userData = data?.me || {};

    if (Auth.loggedIn()) {
      return (
        <Box
          margin="10px"
          width="50%"
          display="flex"
          justifyContent="space-between"
          >
          <Typography variant="h6">
            Welcome {userData.username}
          </Typography>
          <ColorButton 
            onClick={Auth.logout}
            variant="contained"
            
            >
              Logout
          </ColorButton>
        </Box>
      )
    }
  }

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Current Realm Date is {format(new Date(), "MMMM do Y")}
          </Typography>
          {addUsername()}
          <Avatar className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.drawer} padding="10px">
          <img
            src={HHLogo}
            alt="Hoarders Helper"
            width="240"
            height="auto"
            margin="10"
          />
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon className={classes.drawerPaperIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
 
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
      <div>
      </div>

      <div  align='center' >
        <footer className={classes.footBar}>
          <Typography variant="subtitle1" color="textColor">
            Hoaders Helper
          </Typography>
          <Typography component="p" variant="caption">
            @2021 All right reserved
          </Typography>
        </footer>
      </div>
    </div> 





  );
}