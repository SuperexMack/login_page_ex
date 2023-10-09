const express = require("express");
const app = express();
const path = require("path")
const port = 4500;


app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname , "views"));

app.get("/" , (req,res)=>{

res.render("home.ejs");



})


app.get("/MackSite" , (req,res) =>{

res.send("<h1>Welcome to the mack side buddy</h1>");


})


app.get("/ig/:username" , (req,res) =>{

const followers = ["Rahul" , "Hanshika" ,"diox"]   
let {username} = req.params
res.render("home.ejs" , {username , followers})


})


// host: "localhost"
// user:"root"
// database: "database name where our table is stored"
// password: "enter the password of mysql"




































app.listen(port , ()=>{


console.log(`your server is running on the port ${port}`)



})





















