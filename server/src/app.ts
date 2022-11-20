import express, { Express } from "express";
import cors from 'cors';
import logger from './middleware/generalMiddlewares';
import generalRoutes from "./routes/generalRoutes";
import usersRoutes from "./routes/usersRoutes";
import addressesRoutes from "./routes/addressesRoutes";
import waterMetersRoutes from "./routes/waterMeterRoutes";
import waterUsageRoutes from "./routes/waterUsageRoutes";
import authController from "./components/controllers/authContoller";
import authMiddleware from "./middleware/authMiddleWare";
import config from './apiConfig';

const app: Express = express();
const { port, apiPath } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
//Enable CORS security headers
app.use(cors())

app.post(`${apiPath}/login`, authController.login); //TODO: välja kommenteeritud, et frondis ilma autentimiseta andmed kätte saaks
app.use(`${apiPath}/health`, generalRoutes);
app.use(authMiddleware.isLoggedIn); //TODO: välja kommenteeritud, et frondis ilma autentimiseta andmed kätte saaks
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/addresses`, addressesRoutes);
app.use(`${apiPath}/water-meter`, waterMetersRoutes);
app.use(`${apiPath}/water-usage`, waterUsageRoutes);

export default app;