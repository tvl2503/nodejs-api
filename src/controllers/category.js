const Category = require("../models/Category")


module.exports.createCategory = async (req, res) => {

    try{
        const newCate = new Category(req.body)
        const saveCate = await newCate.save()
        res.status(201).json(saveCate)
    }catch(err){
        res.status(401).json(err.keyValue);

    }
} 
module.exports.getAllCategory = async (req, res) => {
    try{
        const category = await Category.find({}).sort({createdAt: 1})
        res.status(201).json(category)
    }catch(err){
        res.status(401).json({message: "Đã xảy ra lỗi"})
    }
}