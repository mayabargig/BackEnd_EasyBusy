const jwt = require("jsonwebtoken");
const jwtSecret = "123#123";

const generateToken = (payload)=>{
    const token = jwt.sign(payload, jwtSecret, {expiresIn: "5h"});
    return token;
};

const verifyToken = (token)=>{
    const payload = jwt.verify(token, jwtSecret);
    console.log(payload);
    return payload;
};

module.exports = { generateToken, verifyToken };