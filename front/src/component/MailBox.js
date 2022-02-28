import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import FormLabel from '@material-ui/core/FormLabel';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { Icon, Button } from '@material-ui/core';


export default function  MailBox (){
const [mails,setMails] = useState([]);
const [expanded, setExpanded] = useState([]);
const [page, setPage] = useState(1);
const [forceUpdate, setForceUpdate] = useState(""); 
const classes = useStyles();

// ############################################ data handling #################################################
  // initializing data
useEffect(() => {
  getMails();
}, [page, mails.length]); 

const initializeExpanded = (length) => {
  var exp = Array(length);
  exp.fill(false,0,length);
 setExpanded([...exp]);

}

// user data
const getMails = () => {
  fetch('http://localhost:4000/mail/mailbox',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({page:page}),
  
  })
  .then(response => response.json())
  .then(response=>{ console.log(response); setMails(response.data[0]); initializeExpanded(response.data[0].length);console.log(response)} )
  .catch(
      error => console.log(error)
    )
}

const handleDelete = (email_id) =>{  
  axios
    .post('http://localhost:4000/mail/handledeleted',{is_mailbox : 1 ,id:email_id} )
    .then(response => response)

    .then(data => console.log(data))
    
    .catch(err => {
      console.error(err);
      
    });
  }

const handleIsRead = (email_id) =>{  
    axios
      .post('http://localhost:4000/mail/mailbox/handleread',{id : email_id } )
      .then(response => response)
    
      .then(data => console.log(data))
        
      .catch(err => {
        console.error(err);
          
      });

}

 
//############################################### input handling #####################################################
   const handleChange = (index) => (event) => {
            var newMails = mails;
            newMails[index].is_read = true;
            setMails([...newMails]);

            handleIsRead(mails[index].email_id)

      var newExp = expanded;
       newExp[index] = !newExp[index];
     setExpanded([...newExp] );
     console.log("expand",expanded)
    
   };

   const onDelete = ( index)  => {
    handleDelete( mails[index].email_id);

    var newMails = mails;
     newMails = newMails.splice(index,1);
     console.log(mails)
    setMails([...newMails]);
    setForceUpdate("'");
    console.log("rerendering")
    

    };

//##################################################### rendering ############################################################
const renderMail = ({body,is_read,s_username,send_time,subject,type},index) => {
  
  return (

    
     <div >
{console.log(mails)}
       <ExpansionPanel  className={classes.item} onChange={handleChange(index)}>

         <ExpansionPanelSummary
           expandIcon={<ExpandMoreIcon />}
           aria-label="Expand"
           aria-controls="additional-actions1-content"
           id="additional-actions1-header"
         >
           <Brightness1Icon className={classes.icon}  style={is_read ? {color:"green"}:{color:"red"}}/>
           <FormLabel className={classes.lables}> 
                {s_username}
           </FormLabel>

            <FormLabel className={classes.lables}>
                {subject}
            </FormLabel>

            <FormLabel className={classes.lables} > 
                {type.data[0] ? "CC":" "}
            </FormLabel>

            <FormLabel className={classes.lables} > 
                {send_time.toString().replace("T"," ").substring(0,19)}
            </FormLabel>


           
         </ExpansionPanelSummary>

         <ExpansionPanelDetails className={classes.body}>
           <Typography color="textSecondary">
           <hr/>

             {body}

           </Typography>
           <Button className={classes.btn} onClick={()=>onDelete(index)} > حذف </Button>

         </ExpansionPanelDetails>
        
       </ExpansionPanel>
       </div>

  )
   
  }

//##################################################### main ###########################################################
   return (
     <div classes={classes.main}>
        <div className={classes.root}>
            {mails.map((item,index) => renderMail(item,index))}
        </div>
        <Pagination className={classes.pagination} count={10}  color="secondary" onChange={(event, page) => setPage(page)} />

     </div>
   );
 }


 const mainWidth = window.innerWidth;
 const mainHeight = window.innerHeight;
 const useStyles = makeStyles((theme) => ({ 
    root: {
      width: '98.75%',
      marginRight:mainWidth/160,
      marginLeft:mainWidth/160,
      marginBottom:mainWidth/100,
      height:mainHeight*0.8

      

    },
 
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    item:{
        flex:1,
        flexDirection:"column",
        justifyContent:"cneter",
        alignItems:"center",
        backgroundColor: '#000',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        
        backgroundColor:"transparent",
        border:"0.1px solid white",
        marginBottom:5

    },
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        border:"2px solid white",
        background:"#000"
        
    },
    icon:{
      marginRight:20,
      alignSelf:"center"
    },
    checkbox:{
      alignSelf:"center",
      borderWidth:1,
      borderColor:"#000",
      right:1
    
    },
    pagination:{
      marginRight:window.innerWidth/4,
      marginLeft:window.innerWidth/3,
      paddingBottom:mainHeight/20

      
    },
    btn: {
      width: window.innerWidth/20,
      backgroundImage: 'linear-gradient(315deg, #42378f 0%, #f53844 74%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      height: 28,
      padding: '0 30px',
      marginTop:10,
    },
    body:{
      flex:1,
      flexDirection:"column",
      direction:"rtl"
      
    },
    summary:{
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    },
    lables:{
      flex:0.4,
      fontSize:20,
      color:"#FFF5EE"

  }
  }));