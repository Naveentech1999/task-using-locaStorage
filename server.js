 const express = require("express");
 const bodyParser = require("body-parser")
 const {LocalStorage} = require("node-localstorage")
 const fs = require("fs")
 const app = express();
 const PORT = process.env.PORT || 8080


 app.use(bodyParser.json());


 const localStorage = new LocalStorage("./localStorage");


 //Register-API for storing the data in localStorage


 app.post("/register",(req,res)=>{
    try{

        const usersData = req.body;

        let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

        users.push(usersData);

        localStorage.setItem('users',JSON.stringify(users))
        res.status(200).json({message:"Data stored in localStorage successfully..."})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error..."})
    }
 })



 //Login-API for login using the data from localStorage
app.post("/login",(req,res)=>{
    try{

            const {email,password} = req.body;

            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

            const user = users.find(user => user.email === email && user.password === password)

            if(user){
                res.status(200).json({message:"User logged in successfully...",user})
            }else{
                res.status(401).json({message:"Invalid Username/email or Password..."})
            }

    }catch(err){
        console.log(err)
        res.status(500).json({nessage:"Internal Server Error..."})
    }
})


//API to get data from localStorage

app.get("/data",(req,res)=>{
    try{

            fs.readFile("./localStorage/users",(err,data)=>{
                if(!err){
                    res.status(200).json(JSON.parse(data))
                }
            })




    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error..."})
    }
})





 app.listen(PORT,()=>{
    console.log(`Server running on a ${PORT} port...`)
 })