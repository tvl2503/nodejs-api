const {decode} = require("../../utils/jwt");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try{
            const user = await decode(token)
            if(!user)  
                return res.status(401).json({code: 401, message: "Token hết hạn!"});
            const userdb = await User.findById(user.id)
            if(!userdb) return res.status(401).json({code: 401, message: "Tài khoản không tồn tại!"});
            req.user = userdb
            return next()
        }catch(err){
            console.log(err);
            return res.status(401).json({code: 401, message: "Bạn chưa đăng nhập!", result: []});
        }
    } else {
        return res.status(401).json({code: 401, message: "You are not authenticated!"});
    }
}

const verifyTokenAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(200).json({code: 403, message:"Bạn không có quyền làm điều này!"});
        }
      });
}
module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}