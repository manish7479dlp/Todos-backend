const User = require("../models/user.models");
const jwt = require("jsonwebtoken");


const verifyJWT = async (req , res , next) => {
     try {
        const token = req.header("Authorization")?.replace("Bearer" , "");

        if(!token) {
            res.status(404).json({statusCode: 404 , status: false , message: "unauthorized User"})
        }

        const decodedToken =  jwt.verify(token , process.env.BCRYPTJS_SECRET_KEY)

        const user = await User.findById(decodedToken?._id);

        if(!user) {
            res.status(404).json({statusCode: 404 , status: false , message: "unauthorized User"})
        }

        req.user = user;
        req.accessToken = User.generateAccessToken();
        next();


     } catch (error) {
        console.log("Error", error)
     }
}

module.exports = {verifyJWT}