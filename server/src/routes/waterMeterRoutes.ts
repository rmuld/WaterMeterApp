import express from 'express';
import waterMeterControllers from '../components/controllers/waterMetersController';
import waterMetersMiddleware from '../middleware/waterMetersMiddlewares';

const waterMetersRoutes = express.Router();

waterMetersRoutes
    .get("/", waterMeterControllers.getAllWaterMeters)
    .get("/:id", waterMeterControllers.getWaterMeterById)
    .post("/", waterMetersMiddleware.checkCreateWaterMeterData, waterMeterControllers.createNewWaterMeter)
    //.delete("/:id", waterMeterControllers.deleteWaterMeterById);

export default waterMetersRoutes;