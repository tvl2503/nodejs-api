const router = require('express').Router();
const CategoryController = require('../controllers/category')
const {verifyTokenAndAdmin} = require("../middleware/auth")

router.post("/", verifyTokenAndAdmin, CategoryController.createCategory)
router.get("/", CategoryController.getAllCategory)

module.exports = router
