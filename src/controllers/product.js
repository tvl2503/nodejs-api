const Product = require("../models/Product")
const Category = require("../models/Category")

module.exports.createProduct = async (req, res) =>{
    try{
        const product = new Product(req.body)
        const savedProduct = await product.save()
        res.status(200).json({code : 0 ,result :savedProduct, message: "Thành công!"})
    }catch(err){
        res.status(500).json({code : 500, message: "Thất bại!"})
    }
}
module.exports.getAllProduct = async (req,res) => {

    // const rangePrice = priceMin && priceMax ? {price: {$gte : priceMin, $lt : priceMax}} : {}
    const page = req.body.page || -1;
    const cateId = req.body.categoryId || "";
    // const priceMin = req.body.priceMin;
    // const priceMax = req.body.priceMax;
    const keyword = req.body.keyword || "";
    const sort = req.body.sort || [];
    const category = cateId ? {category: cateId} : {};
    const total = await Product.countDocuments(category);
    const page_size = req.body.page_size || 8;
    try {
      let products
      let sortObj  =  {}
      sort.forEach((item, index) => {
        sortObj = {...sortObj, [item.property] : item.direction === 'desc' ? -1 : 1}
      })
      if(page > 0) {
        products = await Product.find(category)
            .or( {name: {$regex: keyword}})
            .populate('category')
            .sort(sortObj)
            .skip(page_size*(page > 0 ? page - 1 : page))
            .limit(page_size)
      }else{
        products = await Product.find(category)
        .or( {name: {$regex: new RegExp(keyword, "i")}})
        .populate('category')
        .sort(sortObj)
      }
       res.status(200).json({
        code : 0,
        message : "Ok",
        result: {
          items : products,
          total : Math.ceil(page > 0 ? total/ page_size : 1 )
        }
      }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code : 400,
        message : "Đã có lỗi xảy ra"
      });
    }
}
module.exports.getProductByID = async (req, res) => {

    try{
        const product = await Product.findById(req.params.id).populate('category')
        res.status(200).json(product);
    }catch(err) {
        res.status(500).json({message: "Sản phẩm không được tìm thấy!"})
    }
}
module.exports.searchProductByKeyWord = async (req, res) => {
  try{
    let product = await Product.find(
      {
        "$or": [
          {name: {$regex: req.params.key}}
        ]
      }
    ).populate('category')


    res.status(200).json({ result : product, code : 0, message: "Thành công"});

  }catch(err){
    res.status(500).json({message: "Sản phẩm không được tìm thấy!"})
    
  }
}