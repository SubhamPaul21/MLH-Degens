import mongoose, { Schema, Document } from 'mongoose';

export interface OTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export default mongoose.model<OTP>('OTP', OTPSchema);