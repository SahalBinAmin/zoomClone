const { Schema } = require("mongoose");

const meetingSchema = new Schema({
  user_Id: { type: String, required: true },
  meetingCode: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
