var jwt = require('jsonwebtoken');
const JWT_SECRET="JaiShreeRam"

const fetchUser=(req, res, next)=>{
    // Get the user form jwt token and add id to req object
    const token= req.header('auth-token');
    if (!token) {
        res.status(400).json({ error: "Please Authenticate using a valid token" });
      }
      
      try {
        const data= jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
      } catch (error) {
        res.status(400).json({ error: "Please Authenticate using a valid token" });
      }
      
}

module.exports = fetchUser;
