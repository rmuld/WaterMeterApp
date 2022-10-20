import express, { Express } from "express";
import logger from './middleware/generalMiddlewares';
import generalRoutes from "./routes/generalRoutes";
import usersRoutes from "./routes/usersRoutes";
import addressesRoutes from "./routes/addressesRoutes";
import waterMetersRoutes from "./routes/waterMeterRoutes";
import authController from "./components/controllers/authContoller";
import authMiddleware from "./middleware/authMiddleWare";

const app: Express = express();
const PORT: number = 3001;
const apiPath = '/api/v1';

app.use(express.json());
app.use(logger);
console.log("it works on my machine")
app.post(`${apiPath}/login`, authController.login);
app.use(`${apiPath}/health`, generalRoutes);
app.use(authMiddleware.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/addresses`, addressesRoutes);
app.use(`${apiPath}/water-meter`, waterMetersRoutes);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});