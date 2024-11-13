const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const auth_token = req.header('Authorization')?.replace('Bearer ', '');

  //no auth provided , reject
  if (!auth_token) {
    return res.status(401).json({ message: 'Access denied. No auth_token provided.' });
  }

  // decode the auth token by designing it using the secret key provided while signing it 
  //if not verified reject 
  try {
    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid auth_token.' });
  }
};

const AdminAccessRequired = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden. Only admin can access this endpoint.' });
  }
  next();
};

module.exports = { authMiddleware, AdminAccessRequired };
