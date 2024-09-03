// controllers/auth.controller.js
import User from '../models/user.model.js';
import { generateOTP, sendOTPEmail, saveOTP, verifyOTPService } from '../utils/otp.js';

export const requestOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("user email data: ", email);
    const user = await User.findOne({ email });
    console.log("user data: ", user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    await sendOTPEmail(email, otp);
    await saveOTP(user._id, otp);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await verifyOTPService(user._id, otp);

    if (!isValid) return res.status(400).json({ message: 'Invalid or expired OTP' });

    res.status(200).json({ message: 'OTP verified' });
  } catch (error) {
    next(error);
  }
};
