const cartController = require("../controllers/cart")
const router = require('express').Router();
const {verifyToken} = require("../middleware/auth")

router.post("/user/", verifyToken, cartController.addToCart)
router.get("/user/", verifyToken, cartController.getToCartByUser)
router.put("/user/:id", verifyToken, cartController.updateCartByUser)


module.exports = router
