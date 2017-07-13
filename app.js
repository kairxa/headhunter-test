const express = require('express');
const OAuth = require('oauth');
const bodyParser = require('body-parser');
const tokens = require('./twitterTokens');

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  tokens.consumerKey,
  tokens.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.get('/timeline', (req, res) => {
  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json',
    tokens.accessKey,
    tokens.accessSecret,
    (e, data) => {
      if (e) {
        res.send(e);
        process.exit(1);
        return;
      }

      res.send({
        message: JSON.parse(data),
      });
    }
  );
});

app.get('/single/:tweetId', (req, res) => {
  oauth.get(
    `https://api.twitter.com/1.1/statuses/show/${req.params.tweetId}.json`,
    tokens.accessKey,
    tokens.accessSecret,
    (e, data) => {
      if (e) {
        res.send(e);
        process.exit(1);
        return;
      }

      res.send({
        message: JSON.parse(data),
      });
    }
  );
});

app.post('/tweet', (req, res) => {
  oauth.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    tokens.accessKey,
    tokens.accessSecret,
    req.body,
    'json',
    (e, data) => {
      if (e) {
        res.send(e);
        process.exit(1);
        return;
      }

      res.send({
        message: data,
      });
    }
  );
});

app.post('/delete', (req, res) => {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/destroy/${req.body.tweetId}.json`,
    tokens.accessKey,
    tokens.accessSecret,
    req.body,
    'json',
    (e, data) => {
      if (e) {
        res.send(e);
        process.exit(1);
        return;
      }

      res.send({
        message: data,
      });
    }
  );
});

app.get('/check', (req, res) => {
  oauth.get(
    'https://api.twitter.com/1.1/application/rate_limit_status.json', // change to home timeline
    tokens.accessKey,
    tokens.accessSecret,
    (e, data) => {
      if (e) {
        res.send(e);
        process.exit(1);
        return;
      }

      res.send({
        text: data,
      });
    }
  );
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
