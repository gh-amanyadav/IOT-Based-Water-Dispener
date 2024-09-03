// controllers/reportController.js
import ReportData from '../models/report.model.js';
import { errorHandler } from '../utils/error.js';
import moment from 'moment-timezone';

export const getReport = async (req, res, next) => {
    const { data } = req.query;

    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [deviceId, handWash500, bodyWash500, shampoo500, handWash250, bodyWash250, shampoo250] = data.split(',');

    if (!deviceId || !handWash500 || !bodyWash500 || !shampoo500 || !handWash250 || !bodyWash250 || !shampoo250) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const istDatetime = moment().tz('Asia/Kolkata').format(); // Get current date and time in IST

    const newReport = new ReportData({
        deviceId,
        datetime: istDatetime, // Set the IST datetime
        handWash500: Number(handWash500),
        bodyWash500: Number(bodyWash500),
        shampoo500: Number(shampoo500),
        handWash250: Number(handWash250),
        bodyWash250: Number(bodyWash250),
        shampoo250: Number(shampoo250),
    });

    try {
        await newReport.save();
        res.status(201).json({ message: "Report created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getReports = async (req, res, next) => {
    try {
        const reports = await ReportData.find();
        res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
};

export const updateReport = async (req, res, next) => {
    const { id } = req.params;
    const { deviceId, datetime, handWash500, bodyWash500, shampoo500, handWash250, bodyWash250, shampoo250 } = req.body;

    try {
        const updatedReport = await ReportData.findByIdAndUpdate(id, { deviceId, datetime, handWash500, bodyWash500, shampoo500, handWash250, bodyWash250, shampoo250 }, { new: true });
        if (!updatedReport) return next(errorHandler(404, 'Report not found'));
        res.status(200).json(updatedReport);
    } catch (error) {
        next(error);
    }
};

export const deleteReport = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedReport = await ReportData.findByIdAndDelete(id);
        if (!deletedReport) return next(errorHandler(404, 'Report not found'));
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        next(error);
    }
};
