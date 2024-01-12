import express from "express";

import cors from "cors";
import { userRoutes } from "./routs/User-routes";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
userRoutes(app);
app.listen(3000, () => {
  console.log(`server runing on port 3000`);
});
