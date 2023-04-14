const router = require('express').Router();
const UserController = require('../controllers/users')
const {verifyToken} = require("../middleware/auth")
router.post('/register',UserController.createUser)                   
router.post('/login',UserController.loginUser) 
router.get('/me', verifyToken, UserController.getMe )
module.exports = router