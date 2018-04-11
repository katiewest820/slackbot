const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {PORT} = require('./config');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.all('/');

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