// App.js

import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PostForm from './component/PostForm.js';
import Home from './component/Home.js';
import Login from './component/Login.js';
import Edit from './component/Edit.js';
import GetInfo from './component/GetInfo.js';
import MailBox from './component/MailBox.js';
import Compose from './component/Compose.js';
import SentBox from'./component/SentBox.js';
import News from'./component/News.js';

import Drawer from '@material-ui/core/Drawer';
import Lable from '@material-ui/core/FormLabel';
import { Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default function App () {

    const [open, setOpen] = useState(true);
    const handleClick = () => setOpen(!open);
    const classes = useStyle();
    return (
  
    <Router>
      <div className={classes.root}>
          
              
              <div className={classes.navbar}>
                  
                  <Button  className={classes.btn}><MenuIcon fontSize={"large"} onClick={handleClick}/></Button>                  
                   <Typography className={classes.title}>
                       <h1>به سامانه مدیریت ایمیل امیر کبیر خوش آمدید</h1>

                   </Typography>
                   <hr/>
                  
              </div>
          
        <Drawer open={open} onClose={handleClick}  >
        <ul className={classes.drawer}>

            <li onClick={handleClick} className={classes.item}><Link to={'/'}        className={classes.link}> home </Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/signup'}  className={classes.link}>signup</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/login'}   className={classes.link}>login</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/edit'}    className={classes.link}>edit</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/getinfo'} className={classes.link}>getinfo</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/mailbox'} className={classes.link}>mailbox</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/sentbox'} className={classes.link}>sentbox</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/compose'} className={classes.link}>compose</Link></li>
            <li onClick={handleClick} className={classes.item}><Link to={'/news'} className={classes.link}>news</Link></li>

            </ul>

        </Drawer>

          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signup' component={PostForm} />
              <Route path='/login' component={Login} />
              <Route path='/edit'  component={Edit} />
              <Route path='/getinfo'  component={GetInfo} />
              <Route path='/mailbox'  component={MailBox} />
              <Route path='/compose'  component={Compose} />
              <Route path='/sentbox'  component={SentBox} />
              <Route path='/news'  component={News} />






          </Switch>
        </div>
      </Router>
    );
  };
  const mainWidth = window.innerWidth;
  const mainHeight = window.innerHeight;
  const useStyle = makeStyles({
    root:{
      flex:1,
      flexDirection:"row",
      
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" 

    },
    navbar:{
      flex:1,
      flexDirection:"row",
    },
    title: {
      color: "white",
      textAlign: "center",
      textShadow:"1px 1px 30 px white",
    },
    link:{
      textDecoration:"none",
      textAlign:"left",
      color: "white",
      fontSize:20,
      fontFamily:"serif",
      
    },
    item: {
      paddingRight:mainWidth/20,
      paddingLeft:mainWidth/20,
      paddingTop: mainHeight/100,
      paddingBottom:mainHeight/100,
      marginLeft:-40,

      color: "white",
      listStyleType:"none",
      textAlign:"left",
      boxShadow:"1px 1px 5px white",
      border:"0.1px solid white",
      borderRadius:2
      
    },
    drawer:{
      flex:1,
      justifyContent:"space-around",
      marginTop: -5 ,
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" 
    },
    btn:{
      flex:1,
      color: "white",
      width:mainWidth/50,
      marginLeft:5,
      marginTop:5,
      height:mainHeight/10,
      boxShadow:"1px 1px 5px white",
      border:"0.1px solid white"
    }

          
    
        
    
  
  });
  