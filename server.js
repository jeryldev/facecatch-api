import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import dotenv from 'dotenv';

import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'jeryldev',
    password: 'GreatDev2017!',
    database: 'facecatchdb',
  },
});

const app = express();

app.use(express.json());
app.use(cors());

/**
 * Routes
 *
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT = updated user or ranking
 * /imageurl --> POST = Clarifai box parameters
 */

// Get - /
app.get('/', (req, res) => res.send('the api is working'));

// Post - /signin
app.post('/signin', signin.handleSignIn(db, bcrypt));

// Post - /register
app.post('/register', register.handleRegister(db, bcrypt));

// Get - /profile/:userId
app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db));

// Put - /image
app.put('/image', (req, res) => image.handleImage(req, res, db));

// Post - /imageurl
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
