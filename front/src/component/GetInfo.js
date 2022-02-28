import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Button, Divider, Switch, FormControlLabel, Typography } from '@material-ui/core';
import axios from 'axios';

export default function GetInfo(){
    const [username, setUsername] = useState("")
    const [assignAccess, setAssignAccess] = useState({
        username:"",
        hasAccess:false
    })
    const [showResponse, setShowResponseData] = useState({
        myres:false,
        personres:false,
        setAccess:false,
        deleteAccount:false
    });
    const [responseData, setResponseData ] = useState({
        myinfo:[],
        personinfo:[],
        setAccess:[],
        deleteAccount:[]
    })
//----------------------------------------------- data handling ----------------------------------------------------------//         
const handlegetAnotherInfo = () => {
    setShowResponseData({...showResponse,personres:true})
    
        axios
          .post('http://localhost:4000/info/getanother', {username})
          .then(response => response)

          .then(data => setResponseData({...responseData,personinfo:data.data.data }),console.log(responseData.personinfo))
          
          .catch(err => {
            console.error(err);
            
          });
      };


const  handlegetMyInfo = () => {
    setShowResponseData({...showResponse,myres:true})

    fetch('http://localhost:4000/info/getmyinfo')
    .then(response => response.json())
    .then(data =>{ setResponseData({...responseData,myinfo:data.data[0][0]}); console.log(data)} )
    .catch(
     error => console.log(error)
)
}

const handleAssignAccess = () =>{
    setShowResponseData({...showResponse,setAccess:true})
    
    axios
      .post('http://localhost:4000/info/assignaccess', assignAccess)
      .then(response => response)

      .then(data => setResponseData({...responseData,setAccess:data }),console.log(responseData.setAccess))
      
      .catch(err => {
        console.error(err);
        
      });

};

const deleteAccount = () => {
    setShowResponseData({...showResponse,deleteAccount:true})


    fetch('http://localhost:4000/deleteaccount')
    .then(response => response.json())
    .then(data =>{  setResponseData({...responseData,deleteAccount:data.data});})
    .catch(
     error => console.log(error)
)
}

// ---------------------------------------------------------------------------------------------------------------------

    
//---------------------------------------- rendering ----------------------------------------------------------------------------------------
        const renderMyResponse = () => {
            if(showResponse.myres){
                return(
            <div >
                <Typography>
                {JSON.stringify(responseData.myinfo)}

                </Typography>
            </div>
                )
            }
        }

        const renderPersonResponse = () => {
            if(showResponse.personres){
                return(
                    <div className={classes.response}>
                        <Typography>
                             {JSON.stringify(responseData.personinfo)}

                        </Typography>
                      </div>

                )
            }
        }

        const renderDeleteResponse = () => {
            if(showResponse.deleteAccount){
                return(
                    <div>
                        <Typography>
                             {JSON.stringify(responseData.deleteAccount)}

                        </Typography>
                    </div>

                )
            }
        }
        
        const renderSetAccessResponse = () => {
            if(showResponse.setAccess){
                return(
                    <div className={classes.response}>
                        <Typography>
                             {JSON.stringify(responseData.setAccess)}

                        </Typography>
                      </div>

                )
            }
        } 
//----------------------------------------------------------------------------------------------------------------


//-------------------------------- input handling -----------------------------------------------------------------
    const changeUsernameInput = (e) => {
        setUsername(e.target.value)
    }

    const assignUserAccessInput = (e) => {
        setAssignAccess({...assignAccess,username:(e.target.value)})
    }

    const changeAccessState = (e) => {
        setAssignAccess({...assignAccess,hasAccess:e.target.checked})
    }

    
//----------------------------------------------------------------------------------------------------------------------------------
//style 
const classes = useStyles();
 //------------------------------------------- main ----------------------------------------------------------------------------------
    return(
     <div>
        <FormGroup className={classes.root}>
            <FormGroup className={classes.formGroup}>

                    <h1> دریافت اطلاعات خود  </h1>
                    <FormControl>
                    <Button  title={"دریافت اطلاعات خود"} className={classes.btn}  onClick={handlegetMyInfo}>  دریافت اطلاعات </Button>
                    </FormControl>
                    <FormControl className={classes.response} >{renderMyResponse()}</FormControl>

                    <Divider />
                    <h2> اعطای دسترسی یا عدم دسترسی به یک کاربر  </h2>
                    <FormControl>        
                        <InputLabel htmlFor="phone">  نام کاربری فرد را وارد کنید </InputLabel>
                        <Input
                            id="pass" 
                            aria-describedby="my-helper-text"
                            onChange={assignUserAccessInput}
                        />

                    <FormControlLabel
                            control={<Switch checked={assignAccess.hasAccess} size={"medium"} classes={classes.switch} onChange={changeAccessState}  color={"primary"}  />}
                            label=" :دسترسی  "
                     />     
                    </FormControl>
                    <Button className={classes.btn} onClick={() => handleAssignAccess()}> ثبت </Button>
                    <FormControl className={classes.response}  >{renderSetAccessResponse()}</FormControl>   

                    <h1> دریافت اطلاعات کاربران دیگر  </h1>

                    <FormControl>        
                        <InputLabel htmlFor="phone">  نام کاربری فرد دیگر </InputLabel>
                        <Input
                            id="pass" 
                            aria-describedby="my-helper-text"
                            onChange={changeUsernameInput}
                        />

                        
                    </FormControl>
                    <Button className={classes.btn} onClick={() => handlegetAnotherInfo()}> دریافت اطلاعات</Button>
                    <FormControl className={classes.response} >{renderPersonResponse()}</FormControl>   


                    
                    <Button className={classes.delBtn} onClick={() => deleteAccount()}>حذف حساب کاربری </Button>
                    <FormControl className={classes.response} >{renderDeleteResponse()}</FormControl>   


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
        width:mainWidth/2   ,
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
        padding: '5  30px',
        boxShadow: " 2px 2px 14px white",
        border:"0.1px solid white"    ,
        marginTop:5

        
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
      delBtn:{
        width: window.innerWidth/10,
        height:window.innerHeight/8,
        backgroundImage: 'linear-gradient(315deg, #42378f 0%, #f53844 74%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        
        padding: '0 30px',
        marginTop:50,
        boxShadow: " 2px 2px 14px white",
        border:"0.1px solid white"      



      }
  });
  