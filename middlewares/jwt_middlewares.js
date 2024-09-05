const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

const Admin = require("../models/adminmodel")

const generatetoken = (UserData)=>{
    // Generate a new JWT token using user data
    return jwt.sign(UserData, process.env.JWT_SECRET);
}

const jwtmiddleware = ( req, res, next )=>{
    // First we check request headers has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({error : "Token is not Found"});
    }

    // Extract the token from Header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({error : "Unauthorized"});
    }

    try{
        // Here We Verify the Token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("This is Decode", decode);

        // Attach user information to the request object
        req.admin = decode;
        next();

    }catch(error){
        console.log(err);
        res.status(401).json({err : 'Invalid Token'});
    }
}

const checkAdmin = async(Username)=>{
    try{
        const admin = await Admin.findOne({ username : Username });
        //console.log("this is admin", admin)
        if(admin.role === 'admin'){
            return true;
        }
    } catch(error){
        return false;
    }
}

module.exports = { jwtmiddleware, generatetoken, checkAdmin };