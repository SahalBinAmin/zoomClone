const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  user: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
