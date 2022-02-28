import React, {useState, useEffect} from 'react';
import { makeStyles, Typography } from '@material-ui/core';

export default function  Home (){
  const classes = useStyles();
return (
    <div className={classes.root} >
      <Typography className={classes.title}>به منوی   بالا مراجعه کنید </Typography>
      <img src={require('../imgs/logo_en.png')}  className={classes.img}   />

    </div>

)};


const mainWidth = window.innerWidth;
const mainHeight = window.innerHeight;
const useStyles = makeStyles({
  root:{
      flex:1,        
      alignItems:"center",
      justifyContent:"center",
      alignContent:"center"
  },
  img:{
    height:mainHeight*0.85,
    width: mainWidth*0.4,
    marginLeft:mainHeight*0.65,
    alignSelf:"center"
    
  },
  title: {
    flex:1,
    textAlign:"center",
    fontSize:28,
    color:"white",
    margin:30
  }
   
  
}); 