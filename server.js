const { response } = require("express");
const shell = require('shelljs')

var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())
app.post("/api/reg",function(req,res){
    const { repolink } = req.body
    // const path = 'C:\Users\vishn\Desktop\tri3Docs\bayesian'
    // shell.cd(path)
    // shell.exec('git clone '+repolink)
    console.log(repolink)
    res.json({ status: repolink })
  })

app.get("/test",function(req,res){
  response.send("OK")
})

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
