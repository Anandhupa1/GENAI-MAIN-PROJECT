import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  password: { type: String, required: true },
  profilePic: { 
    type: String, 
    default: "path/to/default/profilePic.jpg"
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Singleton Pattern
let UserModel;

try {
  UserModel = mongoose.model('User');
} catch (e) {
  UserModel = mongoose.model('User', userSchema);
}

export default UserModel;
