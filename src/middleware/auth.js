const {decode} = require("../../utils/jwt")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try{
            const user = await decode(token)
            if(!user) 
                throw new Error({message: 'token is not valid!'})
            req.user = user
            return next()
        }catch(err){
            return res.status(401).json({code: 401, message: "Token hết hạn!", result: []});
        }
    } else {
        return res.status(401).json({message: "You are not authenticated!"});
    }
}

const verifyTokenAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(403).json({message:"You are not alowed to do that!"});
        }
      });
}
module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}