const express = require('express');
const dotenv = require('dotenv').config();
const _ = require('lodash');
const bodyParser = require('body-parser');

const { womenPioneers, quotes, videos } = require('./data')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

app.listen(port, () => console.log(`imposter listening on ${port}`));

app.get('/', (req, res) => { res.send('\n 👋 🌍 \n') })

app.post('/', (req, res) => {
  const { text } = req.body;
  const data = {
    form: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: req.query.code
    }};
    const slackData = '';

    const slackResponse = {
      "text": slackData,
      "attachments": [
          {
              // "fallback": "Required plain-text summary of the attachment.",
              // "color": "#36a64f",
              // "pretext": "Hope you feel inspired!",
              // "author_name": "insposter",
              // "image_url": "https://www.telegraph.co.uk/content/dam/Pets/spark/pets-at-home-2017/fluffy-white-puppy.jpg?imwidth=450",
          }
      ]
    };

  if (text === 'quotes') {
    res.send(_.sample(quotes)['quote']);
  } else {
    slackResponse.text = _.sample(videos)+"&t=1m";
    res.send(slackResponse);
  }

  // axios.get(`https://api.giphy.com/v1/gifs/search?api_key=tnHYF9zBR9Kuv2QWa6n5o2mFS1xMjA64&q=cats&limit=1&offset=0&rating=G&lang=en`)
  // .then(response => {
  //    console.log('response', response);
  // })

  // const slackResponse = {
  //   "attachments": [
  //       {
  //           "fallback": "Required plain-text summary of the attachment.",
  //           "color": "#36a64f",
  //           "pretext": "Hope you feel inspired!",
  //           "author_name": "insposter",
  //           "image_url": "https://www.telegraph.co.uk/content/dam/Pets/spark/pets-at-home-2017/fluffy-white-puppy.jpg?imwidth=450",
  //       }
  //   ]
  // };


  // res.send(slackResponse);
});
