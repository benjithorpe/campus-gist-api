import jwt from 'jsonwebtoken';

export function generateAuthToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}
