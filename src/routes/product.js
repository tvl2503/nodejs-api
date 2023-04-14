const router = require('express').Router();
const ProductController = require('../controllers/product');
const {verifyTokenAndAdmin} = require("../middleware/auth");

router.post("/", verifyTokenAndAdmin ,ProductController.createProduct)
router.post("/search", ProductController.getAllProduct)
router.get("/:id", ProductController.getProductByID)
router.get("/search/:key", ProductController.searchProductByKeyWord)

module.exports = router
