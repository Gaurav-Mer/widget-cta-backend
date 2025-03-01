import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const expiresAt = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return { resetToken, hashedToken, expiresAt };
};
