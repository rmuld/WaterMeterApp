import express from 'express';
import addressesControllers from '../components/controllers/addressesController';
import addressesMiddlewares from '../middleware/addressesMiddlewares';

const addressesRoutes = express.Router();

addressesRoutes
    .get("/", addressesControllers.getAllAddresses)
    .get("/:id", addressesControllers.getAddressById)
    .post("/", addressesMiddlewares.checkCreateAddressData, addressesControllers.createNewAddress)
    //.delete("/:id", addressesControllers.deleteAddressById);

export default addressesRoutes;