import express, { Express } from "express";
import logger from './middleware/generalMiddlewares';
import generalRoutes from "./routes/generalRoutes";
import usersRoutes from "./routes/usersRoutes";
import addressesRoutes from "./routes/addressesRoutes";
import waterMetersRoutes from "./routes/waterMeterRoutes";
import authController from "./components/controllers/authContoller";
import authMiddleware from "./middleware/authMiddleWare";
import config from './apiConfig';

const app: Express = express();
const { port, apiPath } = config;

app.use(express.json());
app.use(logger);

//app.post(`${apiPath}/register`, authController.register);
app.post(`${apiPath}/login`, authController.login);
app.use(`${apiPath}/health`, generalRoutes);
app.use(authMiddleware.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/addresses`, addressesRoutes);
app.use(`${apiPath}/water-meter`, waterMetersRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});