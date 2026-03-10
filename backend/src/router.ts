import express from "express";
import userController from "./controller/userController.ts";
import authController from "./controller/authController.ts";

export const route = express.Router();

// ======== UserController ======== //
route.get("/users", userController.getAll);
// route.post("/users", userController.getByEmail);
route.post("/users", userController.create);

// ======== AuthController ======== //
route.post("/login", authController.login);
route.get("/profil", authController.profil);