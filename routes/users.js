const path = require('path');

const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

// get all users
router.get('/get-users', userController.getUsers);
router.post('/add-user', userController.postUser);
router.put('/edit-user/:userId', userController.postEditUser);
router.delete('/delete-user/:userId', userController.postDeleteuser);

module.exports = router;
