import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    deviceID: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;
