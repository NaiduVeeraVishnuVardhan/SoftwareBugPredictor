const express = require('express');
const routes = require('./routes/index');
const PORT = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://govindarajans:sowmyarajan@cluster0.qiqrp.mongodb.net/test',{useNewUrlParser:true,useUnifiedTopology:true});
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');

app.use(express.urlencoded( {extended:true} ));

app.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});
// Routes
app.use('/', routes)
app.use((req, res) => {
    res.status(404).render('404', {title: '404 Page'});
});

app.listen(PORT);
console.log("Listening on port ", PORT);



const uri = 'mongodb+srv://govindarajans:sowmyarajan@cluster0.qiqrp.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

let projectsCollection;

//this function is used to open the connection 
const openConnection = (message) => {
  client.connect((err,db) => {
    projectsCollection = client.db("softwarebug").collection("predictors");
    if(!err){
      console.log('Database Connected')
    }
  });
}
const project=(login,res)=>{
  // insert into collection
  predictorsCollection.insert(project,(err,result)=>{
    console.log('Project Inserted',result)
    res.send({result:200})
  }) 
}

// retrieve all projects
const getprojects=(res)=>{
  projectsCollection.find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result)
  })
}

openConnection()

