const express = require('express');

const Hubs = require('./userDb.js');
const Messages = require('../posts/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateId(req, res, next) {
    console.log("running the validate Id")
    const { id } = req.params;
    Hubs.findById(id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          // We like very specific error messages
          res.status(404).json({ message: "invalid user id" });
        }
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({ message: 'Failed to process request' });
      });
  }

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
