//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Social = require('./models/schema.js')
const seed = require('./models/seed.js')
const Map = require('./models/schema2.js')
const bucketSeed  = require('./models/seed2.js')
const bcrypt = require('bcrypt')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('mongo connected');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form



//___________________
// Routes
//___________________


app.delete('/map/list/:id', (req,res) => {
  Map.findByIdAndRemove(req.params.id, (err,data) => {
    res.redirect('/map/list')
  })
})


app.post('/map/list', (req,res) => {
  Map.create(req.body, (err, data) => {
    res.redirect('/map')
  })
})

app.use('/map/list', (req,res) => {
  Map.find({}, (err,data) => {
    res.render('bucketlist.ejs', {
      lists: data
    })
  })
})


app.get('/map/seed', (req,res) => {
  Map.create(bucketSeed, (err,seed) => {
    res.redirect('/map/list')
  })
})


app.use('/map', (req,res) => {
  Social.find({}, (err,data) => {
    res.render('map.ejs')
  })
})


app.get('/:id/edit', (req,res) => {
  Social.findById(req.params.id, (err,data) => {
    res.render('edit.ejs', {
      post: data
    })
  })
})


app.put('/:id', (req,res) => {
  Social.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data) => {
    res.redirect('/')
  })
})


app.delete('/:id', (req,res) => {
  Social.findByIdAndRemove(req.params.id, (err,data) => {
    res.redirect('/')
  })
})


app.get('/new', (req,res) => {
  res.render('new.ejs')
})


app.post('/', (req,res) => {
  Social.create(req.body, (err, data) => {
    res.redirect('/')
  })
})


app.get('/seed', (req,res) => {
  Social.create(seed, (err,seed) => {
    res.redirect('/')
  })
})


app.get('/:id', (req,res) => {
  Social.findById(req.params.id, (err,editPost) => {
    res.render('show.ejs', {
      social:editPost
    })
  })
})


app.use('/', (req,res) => {
  Social.find({}, (err,data) => {
    res.render('index.ejs', {
      posts: data
    })
  })
})




//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
