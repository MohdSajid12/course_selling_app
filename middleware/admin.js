const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  if(!token){
    return res.status(404).json({msg:`Please provide token`});
  }

  const decodedToken = jwt.verify(token, process.env.JWT_ADMIN);
  if (decodedToken) {
    req.adminId = decodedToken.id;
    next();
  } else {
    return res.status(403).json({ msg: `Invalid Token` });
  }
}

module.exports = adminMiddleware;
