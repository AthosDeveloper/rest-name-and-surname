import express from "express";

import cors from "cors";
<<<<<<< HEAD
import { userRoutes } from "./routs/User-routes";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
=======
import { UserRepositoryImpl } from "./repository/UserRepositoryImpl";
import { UserController} from "./controller/UserController";
import { userRoutes } from "./routs/User-routes";
const app = express();
const userRepository = new UserRepositoryImpl();
const userController = new UserController(userRepository);
app.use(express.urlencoded({extended: true}));
>>>>>>> main
app.use(express.json());
userRoutes(app);
app.listen(3000, () => {
  console.log(`server runing on port 3000`);
});
