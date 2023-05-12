const router = require('express').Router();
const Controller = require("../controllers/checkout")

const {verifyToken} = require("../middleware/auth")

router.post("/", verifyToken, Controller.createCheckout )
module.exports = router
