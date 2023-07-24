import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  car_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const LogModel = mongoose.model("Log", LogSchema);

export default LogModel;
