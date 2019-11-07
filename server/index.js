require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authControllers');

const {CONNECTION_STRING, SESSION_SECRET} = process.env;

const PORT = 4000;

const app = express()

//Top level Middleware
app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database connected');
    
});

//Auth
app.post('/auth/register', authCtrl.register);



app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
);

app.listen(PORT, () => console.log(`It's ALIVE! ${PORT}`))