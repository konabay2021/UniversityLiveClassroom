import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import Notification from "./Notification/Notification";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SchoolIcon from '@material-ui/icons/School';
import axios from "axios"
import { UserType } from "../test"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  root: {
    display: 'flex',
    marginBottom: "64px"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  rightToolBar: {
    marginLeft: 'auto',
    marginRight: -12,
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let [notificationsMenu, setNotificationsMenu] = useState(null);
  let [notice, setNotice] = useState(null)
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const { userType } = useContext(UserType)


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(`/api/user/getNotification`, { withCredentials: true }).then(response => response.data).then((response) => {
      if (response.redirectURL) {
        //back to login
        window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
      }
      else if (!response.error) {
        let tmp = []
        response.docs.sitNotice.map(item => {
          tmp.push(item)
        })
        if (userType === 'student') {
          response.docs.courseNotice.map(item => {
            tmp.push(item)
          })
        }

        response.docs.forumNotice.map(item => {
          tmp.push(item)
        })
        tmp.sort(function (a, b) {
          if (a.date > b.date) //sort  descending
            return -1
          else
            return 1
        })
        setNotice(tmp)
      }
      else {
        setNotice(response.error)
      }
    })
    // if (notificationsMenu || notice === null) {
    //   if (JSON.parse(localStorage.getItem('info'))) {
    //     let username = JSON.parse(localStorage.getItem('info')).username
    //     // get notification form server
    //     fetch(`/api/user/getNotification/${username}`)
    //       .then(response => response.json())
    //       .then(response => {
    //         if (!response.error) {
    //           let tmp = []
    //           response.sitNotice.map(item => {
    //             tmp.push(item)
    //           })
    //           if (JSON.parse(localStorage.getItem('info')).type === 'student') {
    //             response.courseNotice.map(item => {
    //               tmp.push(item)
    //             })
    //           }

    //           response.forumNotice.map(item => {
    //             tmp.push(item)
    //           })
    //           tmp.sort(function (a, b) {
    //             if (a.date > b.date) //sort  descending
    //               return -1
    //             else
    //               return 1
    //           })
    //           setNotice(tmp)
    //         }
    //         else {
    //           setNotice(response.error)
    //         }


    //       });
    //   }

    // }


  }, [notificationsMenu, userType])

  let handleLogout =()=>{
    axios.get(`/api/logout`, { withCredentials: true }).then(response => response.data).then((response) => {
      if (response.redirectURL) {
        //back to login
        window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
      }
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={e => {
              setNotificationsMenu(e.currentTarget);
              setIsNotificationsUnread(false);
            }}
            className={classes.headerMenuButton}
          >
            <Badge
              badgeContent={isNotificationsUnread ? Array.isArray(notice) ? notice.length : null : null}
              color="warning"
            >
              <NotificationsIcon classes={{ root: classes.headerIcon }} />
            </Badge>
          </IconButton>
          <Menu
            id="notifications-menu"
            open={Boolean(notificationsMenu)}
            anchorEl={notificationsMenu}
            onClose={() => setNotificationsMenu(null)}
            className={classes.headerMenu}
            disableAutoFocusItem
          >
            {Array.isArray(notice) && notice.length > 0 ? notice.map(item => (
              <MenuItem
                key={item._id}
                onClick={() => {
                  setNotificationsMenu(null)
                }}
                component={Link}
                to="/NotificationPage"
                className={classes.headerMenuItem}
              >
                <Notification text={"[" + item.course + "]" + " " + item.type} content={item.message} typographyVariant="inherit" />
              </MenuItem>

            )) :
              <MenuItem
                onClick={() => {
                  setNotificationsMenu(null)
                }}
                component={Link}
                to="/NotificationPage"
                className={classes.headerMenuItem}
              >
                <Typography gutterBottom variant="body1" component="p">
                  -------- No New Message --------
                                    </Typography>
              </MenuItem>
            }

          </Menu>
          <Typography variant="h6"  >
            CUHK Live Classroom
          </Typography>




          <section className={classes.rightToolBar}>
            <IconButton color="inherit"
              onClick={handleLogout}
            ><ExitToAppIcon /></IconButton>
          </section>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <MenuList>
          <MenuItem color="inherit" component={Link} to="/userProfile" onClick={handleDrawerClose}>
            <ListItem  >
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItem>
          </MenuItem>


          <MenuItem color="inherit" component={Link} to="/NotificationPage" onClick={handleDrawerClose}>
            <ListItem  >
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
          </MenuItem>

          <Divider />
          <MenuItem component={Link} to="/home" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </MenuItem>
          <Divider />

          <MenuItem component={Link} to="/CourseList" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="My Course" />
            </ListItem>
          </MenuItem>
          <MenuItem component={Link} to="/AddCourse" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><PostAddIcon /></ListItemIcon>
              <ListItemText primary="Sit-in a Course" />
            </ListItem>
          </MenuItem>
        
          <MenuItem component={Link} to="/Attendance" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
          </MenuItem>
          <MenuItem component={Link} to="/ForumHome" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><ForumIcon /></ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>
          </MenuItem>
          <MenuItem component={Link} to="/Quiz" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><TimerIcon /></ListItemIcon>
              <ListItemText primary="Quiz" />
            </ListItem>
          </MenuItem>

          <Divider />

          <MenuItem component={Link} to="/adminInput" onClick={handleDrawerClose} color="inherit">
            <ListItem>
              <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary="Admin Input" />
            </ListItem>
          </MenuItem>

          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
