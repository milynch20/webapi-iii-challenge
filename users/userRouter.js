const express = require('express');

const router = express.Router();
const idBody = [validateUserId];
const idUser = [validateUser];
const idPost = [validatePost];

const Hubs = require('./userDb.js');
const Messages = require('../posts/postDb.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.insert(req.query);
        res.status(200).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the hubs',
        });
      }
});

router.post('/:id/posts', idBody, idUser, idPost, async (req, res) => {
    try {
        const user = await User.getById(req.body);
        res.status(201).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding the hub',
        });
      }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.get(req.query);
        res.status(200).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the hubs',
        });
      }
});

router.get('/:id', idBody, idUser, idPost, async (req, res) => {
    res.status(200).json(req.hub);
});

router.get('/:id/posts', idBody, idUser, idPost, async (req, res) => {
    try {
        const user = await User.getUserPosts(req.params.id);
    
        res.status(200).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error getting the messages for the hub',
        });
      }
});

router.delete('/:id', idBody, idUser, idPost, async (req, res) => {
    try {
        const count = await User.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The hub has been nuked' });
        } else {
          res.status(404).json({ message: 'The hub could not be found' });
        }
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error removing the hub',
        });
      }
});

router.put('/:id', idBody, idUser, idPost, async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The hub could not be found' });
        }
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error updating the hub',
        });
      }
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
    if (req.user && Object.keys(req.user).length) {
        // go on to the next bit of middleware
        next();
      } else {
        // jump to an error handler bit of middleware
        res.status(400).json({ message: "Please include request body"});
      }
    
};

function validatePost(req, res, next) {
    if (req.user && Object.keys(req.user).length) {
        // go on to the next bit of middleware
        next();
      } else {
        // jump to a error handler
        next({ message: "please include request "});
        // jump to an error handler bit of middleware
        // res.status(400).json({ message: "Please include request body"});
      }
};

module.exports = router;
