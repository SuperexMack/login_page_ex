const {faker} = require('@faker-js/faker'); // using this we had created a ready-made format of data like uuid , name , email , password
const mysql = require("mysql2"); // using this we had created a connection between sql and nodejs
const express = require("express"); // using this we had added express to our nodejs
const path = require("path")
const app = express();
const methodOverride = require("method-override") // using this we had converted patch or delete request to get or post request

app.use(methodOverride("_method")) // using this we had converted patch or delete request to get or post request
app.use(express.urlencoded({extended:true})) //using this we had brought the html form to the backend or nodejs

app.set("view engine" , "ejs") // using this we had linked the tamplate or blue print to the nodejs
app.set("views" , path.join(__dirname , "views")) // using this we had given the location of the ejs file



// using the below code we had created a connection to the sql

const connection = mysql.createConnection({

host:"localhost",
user : "root",
database : "mohit",
password : "06062003"

})


//the below code is created and working using faker
let getRandomUser = () => {

return [

    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    

]


}


// Home wala route

app.get("/" , (req,res) =>{

let q = `select count(*) from mohit`

try{

connection.query(q,(err,result) =>{


if(err){

throw err;

}

let number = result[0]["count(*)"] // using this we can find the numberr of users in database in form of integerr

res.render("home.ejs" , {number})

})


}catch(err){
console.log(err)
res.send("some error in database")
}



})


// show route


app.get("/user" , (req,res) =>{

let q = `select * from mohit`

try{

    connection.query(q,(err,users) =>{
    
    
    if(err){
    
    throw err;
    
    }
    
    // console.log(result)
    res.render("users.ejs" , {users})
    
    })
    
    
    }catch(err){
    console.log(err)
    res.send("some error in database")
    }
    
    
})

// Edit route


app.get("/user/:id/edit" , (req,res) =>{

let {id} = req.params
let q = `select * from mohit where uuid='${id}'`

try{

connection.query(q, (err,result) =>{


if(err){

throw err;

}


let user = result[0]

res.render("edit.ejs" , {user})


})


}catch(err){
console.log(err)
}




})


// update route


app.patch("/user/:id" , (req,res) =>{

    let {id} = req.params
    let {password: formpass , userName : newUsername} = req.body
    let q = `select * from mohit where uuid='${id}'`
    
    try{
    
    connection.query(q, (err,result) =>{
    
    
    if(err){
    
    throw err;
    
    }
    
    
    let user = result[0]

    if(formpass != user.password){

    res.send("Wrong password")

    }

    else{


    let q1 = `update mohit set userName = '${newUsername}' where uuid = '${id}' `


    

    connection.query(q1,(req,result) =>{


    if(err) throw err;

    res.redirect("/user")


    })

}


    // res.send(user) // using this we had searched the user on the database
    
    
    })
    
    
    }catch(err){
    console.log(err)
    }
    
    
    
})








app.listen(8080 , () =>{

console.log("server is running at the port 8080")

})
















// pFZhE4aY1ZflQ0e



































// try{

// connection.query(q, [data] ,(err,result) =>{


// if(err){

// throw err;

// }

// console.log(result)

// console.log(result.length)

// })


// }catch(err){
// console.log(err)
// }

// connection.end()












































