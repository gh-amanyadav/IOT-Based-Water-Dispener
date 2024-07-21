import Device from '../models/device.model.js';
import { errorHandler } from '../utils/error.js';

export const createDevice = async (req, res, next) => {
    const { deviceID } = req.body;
    const newDevice = new Device({ deviceID });

    try {
        await newDevice.save();
        res.status(201).json({ message: "Device ID created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getDevice = async (req, res, next) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        next(error);
    }
};

export const updateDevice = async (req, res, next) => {
    const { id } = req.params;
    const { deviceID } = req.body;

    try {
        const updatedDevice = await Device.findByIdAndUpdate(id, { deviceID }, { new: true });
        if (!updatedDevice) return next(errorHandler(404, 'Device not found'));
        res.status(200).json(updatedDevice);
    } catch (error) {
        next(error);
    }
};

export const deleteDevice = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedDevice = await Device.findByIdAndDelete(id);
        if (!deletedDevice) return next(errorHandler(404, 'Device not found'));
        res.status(200).json({ message: "Device ID deleted successfully" });
    } catch (error) {
        next(error);
    }
};
