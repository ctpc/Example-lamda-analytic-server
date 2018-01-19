'use strict';
var express = require('express');
var app = express();


app.get('/',function(req,res){
    res.sendFile(${__dirname}+'/index.html');
});

app.get('/misift',function(req,res){

});

// app.listen(3000) // <-- comment this line out from your app

module.exports = app; // export your app so aws-serverless-express can use it
