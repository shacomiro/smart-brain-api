const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'aa4e641e96464328af75e13196a5c6bf',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entreis) => {
      res.json(entreis[0]);
    })
    .catch((err) => {
      res.status(400).json('unable to get entries');
    });
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
