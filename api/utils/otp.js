// utils/otp.js
import nodemailer from 'nodemailer';
import OTP from '../models/otp.model.js';
import crypto from 'crypto';

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

export const sendOTPEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Email Verification Code',
        text: `Your OTP code for IOT Device is ${otp}. It will expire in 10 minutes.`,
    });
};

export const saveOTP = async (userId, otp) => {
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    const otpDoc = new OTP({ userId, otp, expiresAt });
    await otpDoc.save();
};

export const verifyOTPService = async (userId, otp) => {
    const otpDoc = await OTP.findOne({ userId, otp, verified: false });

    if (!otpDoc) return false;

    if (otpDoc.expiresAt < Date.now()) {
        await OTP.deleteOne({ _id: otpDoc._id });
        return false;
    }

    otpDoc.verified = true;
    await otpDoc.save();
    return true;
};
