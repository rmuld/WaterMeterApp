import express from "express";
import usersControllers from "../components/controllers/usersController";
import authMiddleware from "../middleware/authMiddleWare";
import usersMiddlewares from "../middleware/usersMiddlewares";

const usersRoutes = express.Router();

usersRoutes
    .get("/", usersControllers.getAllUsers)
    .get("/:id", usersControllers.getUserById)
    .post("/", usersMiddlewares.checkCreateUserData, usersControllers.createNewUser)
    .patch("/:id", usersControllers.updateUser)
    .delete("/:id", usersControllers.deleteUserById);

export default usersRoutes;