
import { makeStyles } from '@mui/styles';
import * as React from 'react';
// import Button from '@mui/material/Button';
import { AppBar,Toolbar} from '@mui/material';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    background: 'black !important',
  },
  tabs: {
    color: '#FFFFFF !important',
    marginRight: "20px !important",
    textDecoration: 'none !important',
    fontSize: 20
}
});

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
        <Toolbar>
            <NavLink  className={classes.tabs}  to="/">Code for Interview</NavLink>
            <NavLink  className={classes.tabs} to="all">All Users</NavLink>
            <NavLink  className={classes.tabs} to="add">Add Users</NavLink>

        </Toolbar>
    </AppBar>
    
);
}