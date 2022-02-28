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
const [news,setNews] = useState([]);
const [expanded, setExpanded] = useState([]);
const [page, setPage] = useState(1);
const classes = useStyles();

// ############################################ data handling #################################################
  // initializing data
useEffect(() => {
  getMails();
}, [page, news.length]); 

const initializeExpanded = (length) => {
  var exp = Array(length);
  exp.fill(false,0,length);
 setExpanded([...exp]);

}

// user data
const getMails = () => {
  fetch('http://localhost:4000/news',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({page:page}),
  
  })
  .then(response => response.json())
  .then(response=>{ console.log(response); setNews(response.data[0]); initializeExpanded(response.data[0].length);console.log(response)} )
  .catch(
      error => console.log(error)
    )
}



 
   

   
//##################################################### rendering ############################################################
const renderMail = ({news_id , title, creationDate },index) => {
  
  return (

    
     <div >
{console.log(news)}
       <ExpansionPanel  className={classes.item} >

         <ExpansionPanelSummary
           expandIcon={<ExpandMoreIcon />}
           aria-label="Expand"
           aria-controls="additional-actions1-content"
           id="additional-actions1-header"
         >
           
            <FormLabel className={classes.lables}>
                {news_id}
            </FormLabel>

            

            <FormLabel className={classes.lables} > 
                {creationDate.toString().replace("T"," ").substring(0,19)}
            </FormLabel>


           
         </ExpansionPanelSummary>

         <ExpansionPanelDetails className={classes.body}>
           <Typography color="textSecondary">
           <hr/>

             {title}

           </Typography>

         </ExpansionPanelDetails>
        
       </ExpansionPanel>
       </div>

  )
   
  }

//##################################################### main ###########################################################
   return (
     <div classes={classes.main}>
        <div className={classes.root}>
            {news.map((item,index) => renderMail(item,index))}
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