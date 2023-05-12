const cloudinary = require("../../utils/cloudinary");

module.exports.uploadImage = async (req, res) =>{
    console.log(req.file);
    const file = req.file;
    try{
        const {path} = file 
        const result = await cloudinary.uploader.upload(path);
        res.status(200).json({code : 200, message: "file has been upload!", result : result.secure_url});
    }catch(err){
        console.log(err);
        res.status(500).json({code : 500, message: "Thất bại!"})
    }
}