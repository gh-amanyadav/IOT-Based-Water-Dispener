// models/DispenserData.js
import mongoose from "mongoose";

const reportDataSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  datetime: { type: Date, default: Date.now },
  handWash500: { type: Number, required: true },
  bodyWash500: { type: Number, required: true },
  shampoo500: { type: Number, required: true },
  handWash250: { type: Number, required: true },
  bodyWash250: { type: Number, required: true },
  shampoo250: { type: Number, required: true },
},
{
    timestamps: true
}
);

const ReportData = mongoose.model('ReportData', reportDataSchema);

export default ReportData;
