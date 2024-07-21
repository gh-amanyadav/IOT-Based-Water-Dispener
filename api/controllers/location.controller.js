import Location from '../models/location.model.js';
import { errorHandler } from '../utils/error.js';

export const createLocation = async (req, res, next) => {
    const { location } = req.body;
    const newLocation = new Location({ location });

    try {
        await newLocation.save();
        res.status(201).json({ message: "Location created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getLocation = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
};

export const updateLocation = async (req, res, next) => {
    const { id } = req.params;
    const { location } = req.body;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(id, { location }, { new: true });
        if (!updatedLocation) return next(errorHandler(404, 'Location not found'));
        res.status(200).json(updatedLocation);
    } catch (error) {
        next(error);
    }
};

export const deleteLocation = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedLocation = await Location.findByIdAndDelete(id);
        if (!deletedLocation) return next(errorHandler(404, 'Location not found'));
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        next(error);
    }
};
