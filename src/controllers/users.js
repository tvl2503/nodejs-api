

const User = require('../models/User')
const {hashPassword, matchPassword} = require('../../utils/password')
const {sign,decode} = require('../../utils/jwt')


module.exports.createUser = async (req, res) => {
    console.log(req.body);
    try{
        if(!req.body.user.fullName) throw new Error("Yêu cầu nhập họ và tên!")
        if(!req.body.user.email) throw new Error("Yêu cầu nhập email!")
        if(!req.body.user.password) throw new Error("Yêu cầu nhập mật khẩu!")
        if(!req.body.user.phone) throw new Error("Yêu cầu nhập số điện thoại!")

        const existingUser = await User.findOne({email: req.body.user.email});
        if(existingUser) {
            return res.status(400).json({message: "Email này đã tồn tại!"})
        }
        const img = `https://ui-avatars.com/api/?background=ff324d&color=fff&name=+${req.body.user.fullName}`
        const passwords = await hashPassword(req.body.user.password);
        const newUser =  new User({
            fullname: req.body.user.fullName,
            email: req.body.user.email,
            img: img,
            phone: req.body.user.phone,
            password: passwords,
        })
        
        const savedUser = await newUser.save();
        const token =  sign(savedUser)
        const { password, ...others } = savedUser._doc;  

        res.status(200).json({user: {...others, token}});
    }catch(err){
        console.log(err);
        res.status(422).json({message: "Không thể tạo tài khoản!"})
    }
}
module.exports.loginUser = async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.findOne({
            email: req.body.user.email
        })
        if(!user)
            return  res.status(401).json({message: 'Email không chính xác'});

        const passwordMatch = await matchPassword(user.password, req.body.user.password)
        if(!passwordMatch)
            return res.status(401).json({message: 'Mật khẩu không chính xác '})

        const token =  sign(user)

        const { password, ...others } = user._doc;  
        res.status(200).json({user: {...others, token}});
    }catch(err){
        const status = res.statusCode ? res.statusCode : 500
        res.status(status).json({message: 'Không thể tạo tài khoản '});

    }
}

module.exports.getMe = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOne({_id: userId})
    if(!user) {
        res.status(500).send("Nguời dùng không tồn tại");
    }
    const { password, ...others } = user._doc;
    res.status(200).json({code : 0, message : "Ok", result: others});
}