const swaggerUi = require("swagger-ui-express");
const doc  = require("./docs");
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const { userSchema } = require('./models/user');
const mongo = require('./helpers/mongo')

userSchema.plugin(passportLocalMongoose);
const UserDetails = mongo.model('User', userSchema);

const PORT = process.env.PORT || 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient
mongoose.connect('mongodb+srv://govindarajans:sowmyarajan@cluster0.qiqrp.mongodb.net/test',{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/public", express.static("public"));
app.use("/scripts", express.static("scripts"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(doc));
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});
app.use(express.urlencoded( {extended:true} ));

//Passport Auth
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});
// Routes
app.use("/", routes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
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