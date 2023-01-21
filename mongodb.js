const mongoose=require('mongoose')

mongoose.set('strictQuery',true)


 mongoose.connect('mongodb+srv://login:rahiman@cluster0.lakcpgn.mongodb.net/?retryWrites=true&w=majority',)
 .then(()=>{
    console.log("db conect");
 })
 .catch(()=>{
    console.log("failed to conect")
 })

 const Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 })
const collection=new mongoose.model("collection",Schema)
 module.exports=collection