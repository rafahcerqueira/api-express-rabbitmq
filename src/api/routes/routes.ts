import { Router } from "express";
import {
  getListCarsController,
  createCarController,
} from "../controllers/CarController";
import { getLogsController } from "../controllers/LogsController";

const router = Router();

router.get("/api/listCars", getListCarsController);
router.post("/api/createCar", createCarController);
router.get("/api/logs", getLogsController);

export default router;
