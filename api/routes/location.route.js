import express from 'express';
import { createLocation, getLocation, updateLocation, deleteLocation } from '../controllers/location.controller.js';

const router = express.Router();

router.post('/', createLocation); // Fixed route
router.get('/', getLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
