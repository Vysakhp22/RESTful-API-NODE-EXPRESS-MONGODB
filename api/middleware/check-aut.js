const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token= req.headers.authorization.split(' ')[1]; //split used to avoid white space and bearer
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};