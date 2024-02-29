const { verifyToken } = require("../utils/jwt");

const auth = (req ,res, next) =>{
    try {
        const userToken = req.headers["authorization"];
        if (!userToken) return res.status(401).send("unAuthorized");
        const token = userToken.split(" ")[1];
        const payload = verifyToken(token);
        if (!payload) return res.status(401).send("unAuthorized");
        req.user = payload;
        next();
    } catch (error) {
       return res.status(401).send("unAuthorized");
    }
};

const authorize = (roles)=>{
    console.log({ roles });
    return (req, res, next)=>{
        if(roles.includes(req.user.role)) next();
        else res.sendStatus(401);
    }
};

module.exports = { auth, authorize };