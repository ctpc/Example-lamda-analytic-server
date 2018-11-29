'use strict';
const express = require('express');
const app = express();
const NucoachApi=require('./nucoach-api');


const api=new NucoachApi('your hook id','your hook secret');


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/misift',function(req,res){

    /*
    In here, the lambda function received a copy of misfit sensor data for a client.
     */

    const packet=req.body;
    const userId=packet.userId;
    const sensorData=packet.sensorData || {};

    // saving sensor data to nucoach user model

    api.postModel(userId,sensorData,['raw'])
        .then((body)=>{
            res.status(200).send(body);
        })
        .catch((error)=>{
            res.status(401).send(error);
        });
});

// app.listen(3000) // <-- comment this line out from your app

module.exports = app; // export your app so aws-serverless-express can use it
