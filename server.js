const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(morgan('dev'));

server.use(express.json());
server.use(helmet());

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req);
  console.log(`${req.method} Request`);
  next();
};

module.exports = server;
