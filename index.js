const express=require('express')
const path=require('path')
const ejs=require('ejs')
const session = require('express-session')
const app=express()
const User=require("./mongodb")




app.use(express.json())
app.set("view engine","ejs")
app.set('views',path.join(__dirname,('./views')));
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized: false,
    
    
   
    
  })); 


app.get('/',(req,res)=>{
    if(req.session.user){
      res.render('home',{Username:req.session.user.name});
    }else {
     
    res.render('login')
    }
   
})
app.get('/signup',(req,res)=>{
  if(req.session.user){
    res.render('home',{Username:req.session.user.name});
  }else{
    res.render('signup')
  }
})



app.get('/logout', (req, res) => {
    req.session.destroy
    
    ((err)=>{
        if(err)return res.status(500).send(err);
        res.redirect('/')
       
    });
  });
  




app.post("/signup",async(req,res,)=>{
  const user =new User({
    name:req.body.name,
    password:req.body.password
  })  ;
  user.save((err)=>{
    if (err)return res.status(500).send(err);
    req.session.user=user;
    res.render('login');
  });
  
});


app.post("/",async(req,res,)=>{
  User.findOne({
      name:req.body.name,
      password:req.body.password
  },(err,user)=>{
      if(err)return res.status(500).send(err);
      if(!user)return res.status(404).send('no user');
      req.session.user=user;
      res.render('home',{Username:req.session.user.name});
     
  });

  });


app.listen(5000,()=>{
    console.log('server started')
}) 