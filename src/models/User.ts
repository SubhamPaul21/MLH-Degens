import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
});

export default mongoose.model<User>('User', UserSchema);