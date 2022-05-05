const express=require("express");
const req = require("express/lib/request");
const https=require('https');
const bodyParser=require("body-parser");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const lat=req.body.lat;
    const lon="139";
    const appid="d3af7cc1d5c0005d1d6294d9fbf2e4cc";
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+appid;
    https.get(url,function(resp){
        console.log(resp,resp.statusCode);
        resp.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weather=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const iconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write(`<style> 
            @import url(https://fonts.googleapis.com/css?family=Open+Sans:300);
            * {
                font-family: 'Open Sans', sans-serif;}
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                text-align: center;
                color: white;
                background: url(https://images.unsplash.com/photo-1457365050282-c53d772ef8b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTgyMTc5OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600);
                background-repeat: no-repeat;
              }
              h1 {
                border-top-right-radius: 20px;
                border-top-left-radius: 20px;
                  margin: 130px auto 0;
                  background: rgba(9, 18, 18, 0.5);
                  width: 800px;
              }
              span {
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 20px;
                display:inline-block;
                background: rgba(9, 18, 18, 0.5);
                background: rgba(9, 18, 18, 0.5);
                width: 800px;
              }

              </style>`);
            res.write("<h1>"+weather+"</h1>");
            res.write("<span><img src="+iconURL+"></span>");
            res.send();
        })
    })

})
app.listen(3000,function(){
    console.log("Server is running on port 3000.")
})