import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel, Input, Typography, makeStyles, Button, Divider, Switch, FormControlLabel } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export default function Compose(){
    const [state, setState] = useState({
        subject:"",
        body:"",
        receivers:[],
        ccReceivers:[]
    })
    
    const [responseData, setResponseData ] = useState({
      
    })
   
//----------------------------------------------- data hs=andling ----------------------------------------------------------//         
const onSend = () => {
    
        axios
          .post('http://localhost:4000/mail/compose', state)
          .then(response => response)

    .then(data => setResponseData({...data}))
          
          .catch(err => {
            console.error(err);
            
          });
      };



//---------------------------------------- rendering ----------------------------------------------------------------------------------------
        

//----------------------------------------------------------------------------------------------------------------


//-------------------------------- input handling -----------------------------------------------------------------
    
    const handleSubject = (e) => {
        var newState =  state;
        newState.subject = e.target.value;
        setState({...newState}) ;
    }
    const handleBody = (e) => {
        var newState =  state;
        newState.body = e.target.value;
        setState({...newState}) ;
    }

    const handleReceivers = (e) => {
        var newArray = e.target.value.split(',').map((item) => item.replace("@foofle.com",""));
        while (newArray.length < 3)
            newArray.push("")
        var newState =  state;
        newState.receivers = newArray ;
        setState({...newState}) ;
    }

    const handleCCReceivers = (e) => {
        var newArray = e.target.value.split(',').map((item) => item.replace("@foofle.com",""));
        while (newArray.length < 3)
            newArray.push("")
        var newState =  state;
        newState.ccReceivers = newArray ;
        setState({...newState}) ;
    }

    console.log(state)

//----------------------------------------------------------------------------------------------------------------------------------
//style 
const classes = useStyles();
 //------------------------------------------- main ----------------------------------------------------------------------------------
    return(
      <div className={classes.root}>
         <FormGroup className={classes.root}>     
            <FormGroup className={classes.formGroup}>
                <FormControl className={classes.fields}>
                        <TextField
                            id="outlined-textarea"
                            label="  (ها)ایمیل گیرنده "
                            size="small"
                            placeholder="Placeholder"
                            multiline
                            variant="outlined"
                            placeholder=" با ',' جدا کنید   "
                            onChange={handleReceivers}

                        />
                    </FormControl>  
                    <FormControl className={classes.fields}>
                        <TextField
                            id="outlined-textarea"
                            label="  ( CCها)ایمیل گیرنده "
                            size="small"
                            placeholder="Placeholder"
                            multiline
                            variant="outlined"
                            placeholder=" با ',' جدا کنید   "
                            onChange={handleCCReceivers}


                        />
                    </FormControl>  

                    <FormControl className={classes.fields}>
                        <TextField
                            id="outlined-textarea"
                            label="عنوان"
                            size="small "
                            placeholder="Placeholder"
                            multiline
                            variant="outlined"
                            placeholder="عنوان را وارد کنید"
                            onChange={handleSubject}

                        />
                    </FormControl>

                

                    <FormControl className={classes.fields}>
                        <TextField
                            id="body"
                            label="  متن پیغام خود  را وارد کنید"
                            multiline
                            rows={10 }
                            //defaultValue="Default Value"
                            // variant="filled"
                            variant="outlined"
                            onChange={handleBody}
                            size="large "
                        />
                </FormControl>

               
                    <Button className={classes.btn} onClick={() => onSend()}> ارسال</Button>

                <FormControl className={classes.response}>
                    <Typography >
                        {JSON.stringify(responseData)   }
                    </Typography>
                </FormControl>

            </FormGroup>
        </FormGroup>  


    </div>

                )
} ;

const mainWidth = window.innerWidth;
const mainHeight = window.innerHeight;

const useStyles = makeStyles({
    root:{
        flex:1,
        
        alignItems:"center"
    },
    formGroup: {
        

        flex:1,
        flexDirection:"column",
        alignSelf:"center",
        justifyContent:"space-between",
        width:mainWidth/2,
        borderRadius:25,
        color:"white",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: " 5px 5px 25px #000",
        margin:mainWidth/200,
        padding:55,
        boxShadow: " 4px 4px 20px white",
        border:"0.1px solid white"    

            
        
    },
    btn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '20px 30px',
        alignSelf:"center",
        marginTop:15,
        marginBottom:5,
        boxShadow: " 4px 4px 20px white",
        border:"0.1px solid white"      

      },
      response:{
        textAlign:"center",
        textOverflow:"clip",
        width:mainWidth/2,
        
        color:"white",
        marginTop:2,
        marginBottom:2,
        overflow:"hidden"
        
      },
    

      fields:{
          flex:1,
          marginRight:1,
          marginLeft:1, 
          marginBottom: 4  ,
          direction:"rtl",
          color:"white"
          

    
          

      }
  });
  