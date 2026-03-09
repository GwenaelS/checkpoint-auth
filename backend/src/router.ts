import express from "express";
import userController from "./controller/userController.ts";

export const route = express.Router();

route.get("/users", userController.getAll);
route.post("/users", userController.getByEmail);

route.post("/users", userController.create);