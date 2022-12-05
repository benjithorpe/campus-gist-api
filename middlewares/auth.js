import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied! No token provided.');

  // Verify if token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next(); // Pass control to the next middleware function
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}
