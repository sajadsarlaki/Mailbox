const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser')


const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    timezone:"UTC",
    password:'',
    database:'dbproj1'
})


connection.connect(err => {
    if(err){
        return err;
    }
})



app.post('/',(req,res) => {
    var state = req.body
    
    const SignUp = 
    "CALL SignUp("
    + "'" +  state.user_name + "'," 
    + "'" +  state.password + "'," 
    + "'" +  state.phoneNumber + "'," 
    + "'" +  state.address + "'," 
    + "'" +  state.f_name + "'," 
    + "'" +  state.l_name + "'," 
    + "'" +  state.mobile + "'," 
    + "'" +  state.alias + "'," 
    + "'" +  state.BCN +"',"
    +    state.accessState 
    + ")"
    
    console.log(SignUp)
   
    connection.query(SignUp,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('POST /')
    res.setHeader("signup", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
})







app.get('/info/getmyinfo',(req,res) => {
    const GET_MY_INFO = `Call get_info( 
    @username   ,
  @pass ,
    @phNum  ,
    @adr  ,
    @fname  ,
    @lname  ,
@mNum  ,
 @alname ,
    @BCNNum
    ); `




    connection.query(GET_MY_INFO, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
});





app.get('/deleteaccount',(req,res) => {
    const DELETE_ACCOUNT = " CALL delete_account()"
    connection.query(DELETE_ACCOUNT, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
              

          })
         }
      })
      console.log('DELETEACCOUNT /')
    console.log(DELETE_ACCOUNT)
});


app.post('/info/getanother',(req,res) => {
    var state = req.body;
    const GET_ANOTHER_INFO = "Call get_another_user_access('" + state.username + "'" + ` ,
     @adr,
      @fname,
      @lname,
      @mNum,
      @alname,
      @BCNNum
    ); `




    connection.query(GET_ANOTHER_INFO, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
})


app.post('/info/assignaccess',(req,res) => {
    var assignAccess = req.body;
    const SET_ACCESS = "Call set_user_access('"
     + assignAccess.username + "'," + 
     + assignAccess.hasAccess + 
     ");"
     
     console.log(SET_ACCESS)


    connection.query(SET_ACCESS, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
})

app.post('/signup',(req,res) => {
    var state = req.body
    
    const SignUp = 
    "CALL SignUp("
    + "'" +  state.user_name + "'," 
    + "'" +  state.password + "'," 
    + "'" +  state.phoneNumber + "'," 
    + "'" +  state.address + "'," 
    + "'" +  state.f_name + "'," 
    + "'" +  state.l_name + "'," 
    + "'" +  state.mobile + "'," 
    + "'" +  state.alias + "'," 
    + "'" +  state.BCN +"',"
    +    state.accessState 
    + ")"
    
    console.log(SignUp)
   
    connection.query(SignUp,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('POST /')
    res.setHeader("signup", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
})

app.post('/edit',(req,res) => {
    var state = req.body
    
    const Edit = 
    "CALL edit("
    + "'" + state.password + "'," 
    + "'" + state.phoneNumber + "'," 
    + "'" +  state.address + "'," 
    + "'" +  state.f_name + "'," 
    + "'" +  state.l_name + "'," 
    + "'" +  state.mobile + "'," 
    + "'" +  state.alias + "'," 
    + "'" +  state.BCN +"',"
    +    state.accessState 
    + ")"
    
    console.log(Edit)
   
    connection.query(Edit,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('POST /')
    res.setHeader("edit", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
})



app.post('/login',(req,res) => {
    var state = req.body
    
    const Login  = "CALL login_proc("
    + "'" + state.user_name + "'," 
    + "'" + state.password + "'" +
     ")";
    

    
    
    console.log(Login)
   
    connection.query(Login,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
    
    console.log('POST /')
    res.setHeader("login", true)
    
        
 })

//#################### news ##########################

app.post('/news',(req,res) => {
    var state = req.body;
    
    const GET_NEWS = `CALL get_news( `+ '"'+ state.page + '" , ' +  `
        @id,
        @title_1,
        @time
        );`
        console.log(GET_NEWS)
    connection.query(GET_NEWS, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
});



    
//  ############### mail #############################

app.post('/mail/mailbox',(req,res) => {
    var state = req.body;
    
    const GET_MAILS = `CALL get_mailbox( `+ '"'+ state.page + '" , ' +  `
        @email_id,
        @sender,
        @subject,
        @messege,
        @time,
        @type,
        @isRead
        );`
        console.log(GET_MAILS)
    connection.query(GET_MAILS, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
});


app.post('/mail/sentbox',(req,res) => {
    var state = req.body;
    
    const SENTBOX = `CALL get_sentbox( `+ '"'+ state.page + '" , ' +  `
        @email_id,
        @receiver,
        @subject,
        @messege,
        @time,
        @type,
        @isRead
        );`
        console.log(SENTBOX)
    connection.query(SENTBOX, (err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data:results
          })
         }
      })
});

app.post('/mail/mailbox/handleread',(req,res) => {
    var state = req.body;
    
    
    const SET_READ = `CALL set_read(`+ '"' + state.id + '"'  + ");"; 

    
    console.log(SET_READ)
   
    connection.query(SET_READ,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('SET_READ /')
    res.setHeader("SEt_READ", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
});



app.post('/mail/handledeleted',(req,res) => {
    var state = req.body;
    
    
    const SET_DELETED = `CALL set_deleted(`+ '"' + state.is_mailbox  + '","'+ state.id + '"'  + ");"; 

    
    console.log(SET_DELETED)
   
    connection.query(SET_DELETED,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('SET_DELETED /')
    res.setHeader("SET_DELETED", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
});




app.post('/mail/compose',(req,res) => {
    var state = req.body;


   

    
    
    
    
    const COMPOSE =  ` CALL send_email (` + 
        '"' +  state.subject + '","' 
            + state.body + '","' 
            + state.receivers[0] + '","' 
            +state.receivers[1] + '","' 
            + state.receivers[2] + '","' 
            + state.ccReceivers[0] + '","' 
            + state.ccReceivers[1] + '","' 
            + state.ccReceivers[2]+ '");' ;
            

        

    
   
    connection.query(COMPOSE,(err, results) => {
        if(err)
         return res.send(err)
        else {
          return res.json({
              data : results
          })
         }
      })
    
    console.log('COMPOSE /')
    console.log(COMPOSE)

    res.setHeader("COMPOSE", true)
    // res.status(200).send({
    //     status: 'succes',
        
   // })
    
});





app.listen(4000, () => {
    console.log("backend server listening to port 4000")


});
