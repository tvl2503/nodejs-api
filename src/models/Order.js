const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: ObjectId, ref : "User", required: true },
        products: [
            {
              product : {
                type: ObjectId,
                ref : "Product",
                required: true,
              },
              quantity: Number,
            }
        ],
        name : { type: String, required: true },
        phone : { type: String, required: true },
        address : { type : String, require: true },
        status_ship: { type: String, default: "pending" },
        note: { type: String},
        amount : { type: Number, required: true, default : 0 },
        payment_method: {
            type: String,
            required: true,
            default: 'cash'
        },
        status_payment : {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema);
