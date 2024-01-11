import express from "express";

import cors from "cors";
import { UserRepositoryImpl } from "./repository/UserRepositoryImpl";
import { UserController} from "./controller/UserController";
import { userRoutes } from "./routs/User-routes";
const app = express();
const userRepository = new UserRepositoryImpl();
const userController = new UserController(userRepository);
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
userRoutes(app, userController);
app.listen(3000, () => {
    console.log(`server runing on port 3000`);

}
);