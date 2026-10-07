import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};
