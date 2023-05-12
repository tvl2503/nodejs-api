const Product = require("../models/Product")
const Order = require("../models/Order");
const Cart = require("../models/Cart");

module.exports.createOrder = async (req, res) => {
    try{
        const userId = req.user._id;
        const cart = await Cart.findOne({userId});
        if(!cart) {
            return res.status(400).json({code : 400, message : "Người dùng không có sản phẩm trong giỏ hàng"})
        }
        const products = cart.products.map((item) => {
            return {product : item.productId, quantity : item.quantity}
        })
        const order = await Order.create({...req.body, userId, products, amount : cart.total});
        await Cart.findByIdAndDelete(cart._id)
        return res.status(200).json({code : 200, message: "Thành công", result: order})
    }catch(err){
        return res.status(500).json({code : 500, message: "Thất bại"})
    }   
}
module.exports.getOrder = async (req, res) => {
    try{
        const order = await Order.find({userId : req.user._id}).populate("products.product");
        return res.status(200).json({code : 200, message: "Thành công", result : order})
    }catch(err){
        console.log(err);
        return res.status(500).json({code : 500, message: "Thất bại"})
    }
}
module.exports.getAllOrder = async (req,res) => {
    const page = req.body.page || -1;
    const sort = req.body.sort || [];
    const total = await Order.countDocuments();
    const page_size = req.body.page_size || 8;
    try{
        let order;
        let sortObj  =  {}

        sort.forEach((item, index) => {
            sortObj = {...sortObj, [item.property] : item.direction === 'desc' ? -1 : 1}
        })
        if(page > 0){
            order = await Order.find()
                        .populate("products.product")
                        .sort(sortObj)
                        .skip(page_size*(page > 0 ? page - 1 : page))
                        .limit(page_size)
        }
        else{
            order = await Order.find()
                        .populate("products.product")
                        .sort(sortObj)
        }
        return res.status(200).json({code : 200, message: "Thành công", result : {items : order, total : Math.ceil(page > 0 ? total/ page_size : 1 )}})
    }catch(err){
        console.log(err);
        return res.status(500).json({code : 500, message: "Thất bại"})
    }
}
module.exports.updateOrderById = async (req, res) => {
    try{
        const id = req.params.id;
        const newOrder = await Order.findByIdAndUpdate(id, {
            $set : req.body
        },
        {
            new : true
        })
        return res.status(200).json({code : 200, message: "Thành công!", result : newOrder})
    }catch(err){
        return res.status(500).json({code : 500, message: "Thất bại"})
    }
}

module.exports.getOrderById = async (req, res) => {
    try {
        const id = req.params.id

        const order = await Order.findById(id).populate("products.product")
        return res.status(200).json({code : 200, message: 'Thành công', result : order})
    } catch (error) {
        return res.status(200).json({code : 500, message: "Thất bại"})
    }
}