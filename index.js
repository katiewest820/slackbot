const http = require('http');
const {SLACK_VERIFICATION_TOKEN} = require('./config');


// Initialize using verification token from environment variables
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 3000;

// Initialize an Express application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// You must use a body parser for JSON before mounting the adapter
app.use(bodyParser.json());

// Mount the event handler on a route
// NOTE: you must mount to a path that matches the Request URL that was configured earlier
app.use('/slack/events', slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event)=> {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start the express application
// http.createServer(app).listen(port, () => {
//   console.log(`server listening on port ${port}`);
// });





// const express = require('express');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
const {PORT} = require('./config');
// const app = express();
// const authRoute = require('./routes/authenticationRoutes');

// app.use(morgan('common'));
// app.use(bodyParser.json());

// app.all('/');
// app.use('/verify', authRoute);

let server;

function runServer(port=PORT) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`your server is running on port: ${PORT}`);
      resolve();
    });
  });
}

function closeServer(){
  //return db.end().then(() => {
    return new Promise((resolve, reject) => {
        console.log('closing server');
      server.close(err => {
        if(err){
          return reject(err);
        }
          resolve();
      });
    });
  //});
}

 if (require.main === module) {
   runServer().catch(err => console.log(`internal server error: ${err}`).status(500));
 };

module.exports = {app, runServer, closeServer};