
const Order = require("../models/Order");
const Cart = require("../models/Cart");

module.exports.createCheckout = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({userId});
        if(!cart) {
            return res.status(400).json({code : 400, message : "Người dùng không có sản phẩm trong giỏ hàng"})
        }
        const products = cart.products.map((item) => {
            return {product : item.productId, quantity : item.quantity}
        })
        const order = await Order.create({...req.body, userId, products, amount : cart.total, payment_method : req.body.type});
        await Cart.findByIdAndDelete(cart._id)
        return  res.status(200).json({code : 200, message: "Thành công", result : order})
    } catch (error) {
        console.log(error);
        res.status(500).json({code : 500, message: "Thất bại!"})
    }
}