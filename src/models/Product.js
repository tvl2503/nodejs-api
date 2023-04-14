const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, },
    image: { type: Array, required: true },  
    category: { type: ObjectId,
			ref: 'Category',
			required: true, },
    price: { type: Number, required: true },
    size: {type: Array, required: true},
    percentReduce: { type: Number, default : 0 },
    quantity: {type: Number, required: true},
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
