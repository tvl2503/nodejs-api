const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/user");
const productRoute = require("./routes/product")
const categoryRoute = require("./routes/category")
const UploadRoute = require("./routes/upload")
const CheckoutRoute = require("./routes/checkout")
const OrderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const bp = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8080
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/upload", UploadRoute);
app.use("/api/checkout", CheckoutRoute);
app.use("/api/order", OrderRoute);


app.listen(PORT, () => {console.log("Server da chay");})