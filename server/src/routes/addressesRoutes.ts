import express from 'express';
import addressesControllers from '../components/controllers/addressesController';
import addressesMiddlewares from '../middleware/addressesMiddlewares';

const addressesRoutes = express.Router();

addressesRoutes
    .get("/", addressesControllers.getAllAddresses)
    .get("/:id", addressesControllers.getAddressById)
    .post("/:id", addressesMiddlewares.checkCreateAddressData, addressesControllers.createNewAddress)
    .patch("/:id", addressesControllers.updateAddress)
    .delete("/:id", addressesControllers.deleteAddressById);

export default addressesRoutes;