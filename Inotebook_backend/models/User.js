
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
    default: "General"
  }
});

//optional but clean to have index on email for faster queries
// UserSchema.index({ email: 1 });

const User = mongoose.model("User", UserSchema);
export default User;
