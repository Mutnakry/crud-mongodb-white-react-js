// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);
export default User;
