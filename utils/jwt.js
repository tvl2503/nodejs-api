const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

dotenv.config();

module.exports.sign =  (user) => {
   return jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin,
    }, process.env.JWT_SEC, {
        expiresIn: '1d'
    })
}

module.exports.decode = async (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,process.env.JWT_SEC,(err,decoded) => {
            if(err)
                return reject(err)

            return resolve(decoded)
        })
    })
}