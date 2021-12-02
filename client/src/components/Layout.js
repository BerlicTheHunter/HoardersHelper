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

const drawerWidth = 240
const backgroundColor = '#535455'
const backgroundMain ='#757778'
const textColor = '#FCFAFA'
const accentBlue = '#68D8D6'
const accentRed = '#7B0828'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: backgroundMain,
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
      background: backgroundMain,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})

export default function Layout({ children }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

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
            Current Realm date is {format(new Date(), 'MMMM do Y')}
          </Typography>
          <Typography>User Name</Typography>
          <Avatar className={classes.avatar}/>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Hoarder's Helper
          </Typography>
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
              <ListItemIcon className={classes.drawerPaperIcon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}