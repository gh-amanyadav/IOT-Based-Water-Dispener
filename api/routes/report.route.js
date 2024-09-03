// routes/reportRoutes.js
import express from 'express';
import { getReports, getReport, updateReport, deleteReport } from '../controllers/report.controller.js';

const router = express.Router();

router.get('/', getReports);
router.get('/report', getReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router;
