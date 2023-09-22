const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Register=require("./src/models/registers.js")
require("./src/db/database.js")
app.use(express.json());

app.use(express.urlencoded({extended:false}))
const port=process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("home");
  });
  
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register",async(req,res)=>{
  try{
    const password=req.body.password;
    const cpassword=req.body.confirmpassword;
    if(password===cpassword){
         const employDetails=new Register({
          fullname:req.body.fullname,
          courseType:req.body.courseType,
          email:req.body.email,
          age:req.body.age,
          gender:req.body.gender,
          password:req.body.password,
          confirmpassword:req.body.confirmpassword
         })
         
         const registered=await employDetails.save()
         res.render("home");
    }
    else{
      res.send("Password not matching");
    }
  }
  catch(errpr){
    res.status(400).send(errpr);
  }
})
app.get("/login", (req, res) => {
  res.render("login");
});
 app.post("/login",async(req,res)=>{
  try{
    const email=req.body.email;
    const password=req.body.password;
    const useremail=await Register.findOne({email:email})
      if(useremail.password===password){
        res.status(201).render("home");
      }
    else{
      res.send("password not matching")
    }

  }
  catch(error){
    res.status(400).send("invalid email");
  }
 })
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})