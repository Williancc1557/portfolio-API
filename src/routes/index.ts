import { Router } from "express";
import { routesList } from "./routes";

const router: Router = Router();

new routesList().init()

export { router };
