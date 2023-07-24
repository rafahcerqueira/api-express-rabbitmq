import { Log } from "../models/Log";
import { Request, Response } from "express";
import { MongoDBRepository } from "../../repositories/MongoDBRepository";

const logRepository = new MongoDBRepository(); // Crie uma instância do repositório

export const getLogsController = async (req: Request, res: Response) => {
  try {
    const logs: Log[] = await logRepository.getLogs();

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};
