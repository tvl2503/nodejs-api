const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      products: [
        {
          productId: { type: String, require: true},
          quantity: { type: Number, default: 1,},
          size: {type: String, require: true},
          price: { type: Number, require: true},
          img: { type: String, require: true},
          name: { type: String, require: true},
          percentReduce: {type : Number, require: true, default: 0}
        },
      ],
      total: {type: Number, default : 0}
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Cart", CartSchema);
  