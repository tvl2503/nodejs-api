const router = require('express').Router();
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/auth")
const OrderController = require('../controllers/order')
router.post("/", verifyToken, OrderController.createOrder)
router.get("/", verifyToken, OrderController.getOrder)
router.put("/:id", verifyTokenAndAdmin, OrderController.updateOrderById)
router.post("/search", verifyTokenAndAdmin, OrderController.getAllOrder)
router.get("/:id", verifyToken, OrderController.getOrderById)
module.exports = router