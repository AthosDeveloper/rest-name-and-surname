import { Express, request, response} from "express";
import { UserController } from "../controller/UserController";
export function userRoutes(app: Express, UserController: UserController): void{
app.get("/users", (req, res) => UserController.getUsers(req, res));
    app.post("/users", (req, res) => UserController.createUser(req, res));
    app.get("/users/:id", (req, res) =>  UserController.getUserById(req, res));
    app.put("/users/:id", (req, res) => UserController.updateUser(req, res));
} 