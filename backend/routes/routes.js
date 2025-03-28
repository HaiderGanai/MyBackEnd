const express = require('express')
const { createUser, getUsers, getUserByID, updateUser, deleteUser } = require('../controllers/userController');
const { forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();



//Create a new user
router.post('/add',createUser);

//Get all users

router.get('/getallusers', getUsers);

//Get user by ID
router.get('/getuser/:id', getUserByID);

//update user by ID
router.put('/update/:id', updateUser);

//Delete a user by ID
router.delete('/deleteuser/:id', deleteUser);

// forgot password
router.post('/forgot-password', forgotPassword);

// reset password
router.post('/reset-password', resetPassword)


module.exports = { router };