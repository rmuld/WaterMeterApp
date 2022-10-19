import express from 'express';
import waterMeterControllers from '../components/controllers/waterMetersController';
import waterMetersMiddleware from '../middleware/waterMetersMiddlewares';

const waterMetersRoutes = express.Router();

waterMetersRoutes
    .get("/", waterMeterControllers.getAllWaterMeters)
    .get("/:id", waterMeterControllers.getWaterMeterById)
    .post("/:id", waterMetersMiddleware.checkCreateWaterMeterData, waterMeterControllers.createNewWaterMeter)
    .patch("/:id", waterMeterControllers.updateWaterMeter)
    .delete("/:id", waterMeterControllers.deleteWaterMeterById);

export default waterMetersRoutes;