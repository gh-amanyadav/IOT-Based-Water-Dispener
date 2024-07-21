import express from 'express';
import { createDevice, getDevice, updateDevice, deleteDevice } from '../controllers/device.controller.js';

const router = express.Router();

router.post('/', createDevice); // Fixed route
router.get('/', getDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;
