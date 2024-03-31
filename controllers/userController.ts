import { Request, Response } from 'express';
import User from '../models/User';
import { sendEmail } from '../services/emailService';
import generateOTP from '../utils/generateOTP';
import OTP from '../models/OTP';

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(403).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'User is already registered' });
    }

    let otp: string;
    let otpExists: boolean;
    do {
      otp = generateOTP();
      otpExists = await OTP.exists({ otp });
    } while (otpExists);

    await OTP.create({ email, otp });
    await sendEmail(email, otp);

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(403).json({ message: 'OTP is required' });
    }

    const response = await OTP.find({ otp }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({ message: 'The OTP is not valid' });
    }

    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};