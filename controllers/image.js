import Clarifai from 'clarifai';
import dotenv from 'dotenv';
dotenv.config();

const app = new Clarifai.App({ apiKey: process.env.FACECATCH_KEY });
// const app = new Clarifai.App({ apiKey: 'aadf650da05c4458b5e39384a37b79d3' });

const handleApiCall = (req, res) => {
  return app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json('unable to work with api'));
};

const handleImage = (req, res, db) => {
  db('users')
    .where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0]))
    .catch((error) => res.status(400).json('error on updating entries'));
};

export default {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
