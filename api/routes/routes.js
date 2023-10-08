const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController'); // Import the user controller
const { jwtTokenVerify } = require('../middlewares/authMiddleware'); // Import the token verification middleware

// Define a route for creating a new user
router.post('/user/signup', userController.createUser);

router.post('/user/login', userController.loginUser)

router.get('/users', userController.getAllUsers)

router.get('/user/:email',jwtTokenVerify, userController.getUserByEmail);

module.exports = router;