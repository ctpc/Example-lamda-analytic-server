'use strict';
var express = require('express');
var app = express();
var NucoachApi=require('./nucoach-api');


var api=new NucoachApi('your hook id','your hook secret');


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/misift',function(req,res){

    /*
    In here, the lambda function received a copy of misfit sensor data for a client.
     */

    var packet=req.body;
    var userId=packet.userId;
    var sensorData=packet.sensorData || {};

    // saving sensor data to nucoach user model

    api.postModel(userId,sensorData,['raw'],function(body){
        // if post is successful
        res.status(200).send(body);
    },function (error) {
        // if post is not successful
        res.status(401).send(error);
    })



});

// app.listen(3000) // <-- comment this line out from your app

module.exports = app; // export your app so aws-serverless-express can use it
