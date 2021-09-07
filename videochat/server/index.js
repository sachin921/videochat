const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
 
// parse application/json
app.use(bodyParser.json());
// app.use(cors)
//create database connection
const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'skyposium'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
}); 

 
app.post('/api/user', (req, res)=>{
    // const user = req.body.user.name;
    // res.json(user); return false;
    let data = {name: req.body.user.name, email: req.body.user.email, phone:req.body.user.phone, password:req.body.user.pass};
   
    let sql = "INSERT INTO user_info SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
})

 app.post('/api/login', (req, res)=>{
    //let data = {email: req.body.login.email, password:req.body.login.pass};
    let sql = 'SELECT * FROM user_info WHERE email="' + req.body.login.login_email + '" AND password="' + req.body.login.login_password + '"';
    
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": err, "response": results}));
    }); 
})
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...'); 
});  