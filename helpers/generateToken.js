import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default generateToken;
