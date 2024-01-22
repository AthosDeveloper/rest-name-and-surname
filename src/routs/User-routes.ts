<<<<<<< HEAD
import { Express } from "express";
import {UserController} from '../adapters/in/controller/user/controller'
import { UserService } from "../application/services/user/user-service";
import { UserPersistenceAdapter } from "../adapters/out/database/user-adapter";

export function userRoutes(app: Express): void{
    const persistence = new UserPersistenceAdapter()
    const service = new UserService(persistence)
    const controller = new UserController(service)

    app.get("/users", (req, res) => controller.getUsers(req, res));
    app.post("/users", (req, res) => controller.createUser(req, res));
    app.get("/users/:id", (req, res) =>  controller.getUserById(req, res));
    app.put("/users/:id", (req, res) => controller.updateUser(req, res));
=======
import { Express, request, response} from "express";
import { UserController } from "../controller/UserController";
export function userRoutes(app: Express, UserController: UserController): void{
app.get("/users", (req, res) => UserController.getUsers(req, res));
    app.post("/users", (req, res) => UserController.createUser(req, res));
    app.get("/users/:id", (req, res) =>  UserController.getUserById(req, res));
    app.put("/users/:id", (req, res) => UserController.updateUser(req, res));
>>>>>>> main
} 