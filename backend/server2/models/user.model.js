const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default: 'https://img.freepik.com/premium-photo/3d-character-fashion-little-kid-background_175994-21751.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696809600&semt=ais',
  },
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

let UserModel = mongoose.model('User', userSchema);

module.exports={UserModel}
