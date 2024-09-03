// models/record.model.js
import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    datetime: { type: Date, required: true },
    location: { type: String, required: true },
    username: { type: String, required: true },
    deviceId: { type: String, required: true },
    phoneNo: { type: String, required: true }
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);
export default Record;
