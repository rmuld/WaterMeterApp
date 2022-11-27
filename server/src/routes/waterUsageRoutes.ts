import express from 'express';
import waterUsageController from '../components/controllers/waterUsageController';
import waterUsageMiddlewares from '../middleware/waterUsageMiddlewares';

const waterUsageRoutes = express.Router();

waterUsageRoutes
    .get("/", waterUsageController.getAllWaterUsages)
    .get("/:id", waterUsageController.getWaterUsageByWaterMeterId)
    .post("/", waterUsageMiddlewares.checkCreateWaterUsageData, waterUsageController.createNewWaterUsage)

export default waterUsageRoutes;