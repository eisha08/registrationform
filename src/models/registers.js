const mongoose=require("mongoose");

const employSchema=new mongoose.Schema({
    fullname:{
     type:String,
     required:true,
     index:true
    },
    
       email:{
        type:String,
        required:true,
        unique:true,
        index:true
       },
       gender:{
        type:String,
        required:true
       },
       age:{
        type:Number,
        required:true,
        index:true
        
       },
       password:{
        type:String,
        required:true
       },
       confirmpassword:{
        type:String,
        required:true
       },
       courseType:{
        type:String,
        required:true
       }
})
const Register=new mongoose.model("Register",employSchema);
employSchema.index({fullname:1,email:1,gender:1,age:1,password:1,confirmpassword:1,courseType:1},{unique:true})
//Register.createIndexes();
module.exports=Register;