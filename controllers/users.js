var User = require('../models/user');
var express = require('express');
var router = express.Router();


// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// POST /users
// Create a new user
router.post('/', function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: "Error creating user: " + err
      });
    }

    res.json(user);
  });
});

// PUT /users/:id
// Update a user by ID
router.put('/:id', function(req, res) {
  // try to find model
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    // update model
    user.set(req.body);

    // save model
    user.save(function(err) {
      if (err) {
        return res.status(500).json({
          error: "Error updating user: " + err
        });
      }

      res.json(user);
    });
  });
});

// DELETE /users/:id
// Delete a user by ID
router.delete('/:id', function(req, res) {
  // try to find model
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    // delete model
    user.remove(function(err) {
      if (err) {
        return res.status(500).json({
          error: "Error deleting user: " + err
        });
      }

      return res.json(user);
    });
  });
});

module.exports = router;
