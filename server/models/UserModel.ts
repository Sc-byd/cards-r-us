import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;
import bcrypt from 'bcrypt';

export interface User {
  userId: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
  name: string;
  gallery: string[];
}

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      require: false,
      default: null,
    },
    password: {
      type: String,
      require: false,
      default: null,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    avatar: {
      type: String,
      require: false,
      default: '',
    },
    name: {
      type: String,
      require: false,
      default: '',
    },
    gallery: {
      type: Array(String),
      require: false,
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('userId').get(function (this) {
  return this._id.toString();
});

// // use it for hashing password before saving to database
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    next();
  });
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model('User', userSchema);

export default UserModel;
