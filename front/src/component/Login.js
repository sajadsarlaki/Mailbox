import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Button, Divider } from '@material-ui/core';
import axios from 'axios';

export default function Login(){
    const [state, setState] = useState({
        user_name:"",
        password:"",
      
        })
    const [showResponse, setRenderResponseData] = useState(false);

    const [responseData, setResponseData ] = useState({})

        const changeUsernameInput = (e) => {
            setState({...state,user_name:e.target.value})
        }

        const changePasswordInput = (e) => {
            setState({...state,password:e.target.value})
        }


        const renderResponse = () => {
            if(showResponse){
                return(
            <div >

                status : {JSON.stringify(responseData)}
            </div>
                )
            }
        } 

    const handleSubmit = () => {
        setRenderResponseData(true)
        
            axios
              .post('http://localhost:4000/login', state)
              .then(response => response)
  
              .then(data => setResponseData(data),console.log(responseData))
              
              .catch(err => {
                console.error(err);
                
              });
          };



//style
        const classes = useStyles();

    return(
        <div className={classes.root}>
            <FormGroup className={classes.root} > 
                

                <FormGroup className={classes.formGroup}>



                    <h1> ورود </h1>


                    <FormControl>
                        <InputLabel htmlFor="pass"> نام کاربری  </InputLabel>
                        <Input
                            id="username" 
                            aria-describedby="my-helper-text"
                            onChange={changeUsernameInput} 
                        />
                    </FormControl>
            
                    <FormControl>        
                        <InputLabel htmlFor="phone"> رمز عبور  </InputLabel>
                        <Input
                            id="pass" 
                            aria-describedby="my-helper-text"
                            onChange={changePasswordInput}
                        />

                 </FormControl>

                          
                    <Button className={classes.btn} onClick={() => handleSubmit()}> ثبت اطلاعات</Button>
                    <FormControl className={classes.response}>
                               {renderResponse()}
                    </FormControl>
                </FormGroup>
            </FormGroup>  
           
        </div>

            

                )
};

const mainWidth = window.innerWidth;
const mainHeight = window.innerHeight;

const useStyles = makeStyles({
    root:{
        flex:1,
        height:mainHeight*0.9,
        alignItems:"center"
    },

    formGroup: {
        width:mainWidth/3,
        height:mainHeight/10,
        flex:1,
        flexDirection:"column",
        justifyContent:"stretch",
        alignItems:"center",
        borderRadius:25,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        margin:mainWidth/200,

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
        padding: '25px 30px',
        marginTop: 50,
        boxShadow:"1px 1px 5px white",
        border:"0.1px solid white"
        
      },
      response:{
        textAlign:"center",
        textOverflow:"clip",
        width:mainWidth/3,
        
        color:"white",
        marginTop:2,
        marginBottom:2, 
        overflow:"hidden"
      }
    
  });
  