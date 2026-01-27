var express = require('express')
require('dotenv').config();
var app = express()

app.get('/',function(req,res){
res.send('{response: Hey there! This is Suyog Sinnarkar}')
})

app.get('/signin',function(req,res){
    res.send('{This is sign in page. Please enter your credentials}')
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(" listening in port:",$PORT)
  });
}


module.exports=app;