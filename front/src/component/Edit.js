import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Button, Divider, Switch, FormControlLabel } from '@material-ui/core';
import axios from 'axios';

export default function Edit(){
    const [state, setState] = useState({
        password:"",
        phoneNumber:"",
        address: "",
        f_name:"" ,
        l_name:"",
        mobile:"",
        alias:"",
        BCN:"",
        accessState:false
        })
    const [showResponse, setRenderResponseData] = useState(false);

    const [responseData, setResponseData ] = useState({})


        const changePasswordInput = (e) => {
            setState({...state,password:e.target.value})
        }

        const changeMobileInput = (e) => {
            setState({...state,mobile:e.target.value})
        }

        const changeFNameInput = (e) => {
            setState({...state,f_name:e.target.value})
        }

        const changeLNameInput = (e) => {
            setState({...state,l_name:e.target.value})
        }

        const changeAddressInput = (e) => {
            setState({...state,address:e.target.value})
        }

        const changeAliasInput = (e) => {
            setState({...state,alias:e.target.value})
        }

        const changePhoneNumberInput = (e) => {
            setState({...state,phoneNumber:e.target.value})
        }

        const changeBCNInput = (e) => {
            setState({...state,BCN:e.target.value})
        }

        const changeAccessState = (e) => {
            setState({...state,accessState:e.target.checked})
        }

        


        const renderResponse = () => {
            if(showResponse){
                return(
            <div>
                {JSON.stringify(responseData )}
            </div>
                )
            }
        } 

    const handleSubmit = () => {
        setRenderResponseData(true)
        
            axios
              .post('http://localhost:4000/edit', state)
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
            <FormGroup className={classes.root}> 
                <FormGroup className={classes.formGroup}>

                <h1> ویرایش اطلاعات کاربری  </h1>
                
                <FormControl>
                    <InputLabel htmlFor="pass">رمز عبور </InputLabel>
                    <Input
                        id="pass" 
                        aria-describedby="my-helper-text"
                        onChange={changePasswordInput} 
                    />
                </FormControl>

                <FormControl>        
                    <InputLabel htmlFor="phone"> شماره تلفن همراه  </InputLabel>
                    <Input
                        id="phone" 
                        aria-describedby="my-helper-text"
                        onChange={changeMobileInput}
                    />

                </FormControl>
              
                <Divider/>
                        <h1> اطلاعت شخصی </h1>
                    <FormControl>
                        <InputLabel style={{flex:1}} htmlFor="name">نام </InputLabel>
                        <Input
                            id="name" 
                            aria-describedby="my-helper-text"
                            onChange={changeFNameInput} 
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel  style={{flex:1}} htmlFor="lName">نام خانوادگی </InputLabel>
                        <Input
                            id="Name" 
                            aria-describedby="my-helper-text"
                            onChange={changeLNameInput} 
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="alias"> نام مستعار </InputLabel>
                        <Input
                            id="alias" 
                            aria-describedby="my-helper-text"
                            onChange={changeAliasInput} 
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="address"> آدرس </InputLabel>
                        <Input
                            id="address" 
                            aria-describedby="my-helper-text"
                            onChange={changeAddressInput} 
                        />
                    </FormControl>

                    <FormControl> 
                        <InputLabel htmlFor="mobile"> شماره تلفن   </InputLabel>
                        <Input
                            id="mobile" 
                            aria-describedby="my-helper-text"
                            onChange={changePhoneNumberInput} 
                        />
                     </FormControl>

                     <FormControl> 
                        <InputLabel htmlFor="mobile"> شماره شناسنامه   </InputLabel>
                        <Input
                            id="mobile" 
                            aria-describedby="my-helper-text"
                            onChange={changeBCNInput} 
                        />
                     </FormControl>
                     <FormControlLabel
                            control={<Switch checked={state.accessState} size={"medium"} classes={classes.switch} onChange={changeAccessState}  color={"primary"}  />}
                            label=" :اطلاعاتم را به همه نشان بده "
                    />
                    <Button className={classes.btn} onClick={() => handleSubmit()}> ثبت اطلاعات</Button>
                    <FormControl className={classes.response}>
                               {renderResponse()}
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
        justifyContent:"cneter",
        alignItems:"center",
        alignSelf:"center",
        width:mainWidth/2,

        borderRadius:25,
        color:"white",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: " 5px 5px 25px #000",
        margin:mainWidth/200,
        paddingBottom:20,
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
        boxShadow: " 2px 2px 14px white",
        border:"0.1px solid white"      



      },
      response:{
        textAlign:"center",
        textOverflow:"clip",
        width:mainWidth/2,
        
        color:"white",
        overflow:"hidden ",
        marginTop:2,
        marginBottom:2            
      }
    
    
  });
  