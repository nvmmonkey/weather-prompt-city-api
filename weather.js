//  MODULES  /////////////
const express = require("express")
const get = require("request")
const https = require("https")
const response= require("express")
const bodyParser = require("body-parser")

//  MODULE SETTING  /////////////
const app = express()
const port = 3000 //port test
app.use(bodyParser.urlencoded({extended: true}))

//  GET  /////////////
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

//  POST  /////////////
app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = process.env.ADMIN_KEY
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + units

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            // console.log(weatherData)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            var iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            // console.log("Current temperature in London: ", temp)
            // console.log("The weather looks " + weatherDescription)
            res.write("<p>The weather looks " + weatherDescription + "</p>")
            res.write("<h1>The current temperature in " + query + " is " + temp + " degrees Celcius</h1>")
            res.write("<img src='" + iconURL +"' alt='Weather Icon'>")
            res.send()
        })
    })
})

//  LISTEN  /////////////
app.listen(port, function(req, res){
    console.log("Server is running on port " + port)
})


