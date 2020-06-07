const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors')
const knex = require('knex')

//Controllers
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kent',
    password : 'kent123',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});


// app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cors())

//first way
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//second way
app.post('/signin', signin.handleSignin(db, bcrypt) )
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.get('/', (req, res) => {
	res.send(database.users)
})

app.listen(3000, () => {
 	console.log(`App is listening on port 3000`)
})




// For deployment
// const env = process.env.PORT
// app.listen(env, () => {
// 	console.log(`App is listening on port ${env}`)
// })

