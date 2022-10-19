import express from 'express';
import generalController from '../components/controllers/generalControllers';
const generalRoutes = express.Router();

generalRoutes
    .get('/', generalController.health);

export default generalRoutes;
