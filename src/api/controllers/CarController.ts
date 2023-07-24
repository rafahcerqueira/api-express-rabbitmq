import amqp from "amqplib";
import { Car } from "../models/Car";
import { Request, Response } from "express";
import { CarService } from "../services/CarService";
import { MongoDBRepository } from "../../repositories/MongoDBRepository";
import { channel, queue } from "../../rabbit";

const carService = new CarService(new MongoDBRepository());

export const getListCarsController = async (
  request: Request,
  response: Response
) => {
  try {
    const cars = await carService.getListCars();
    response.json(cars);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

export const createCarController = async (
  request: Request,
  response: Response
) => {
  try {
    const carData: any = request.body;

    // Postando informações na fila
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(carData)));

    response.json({ message: "Car created successfully!" });
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};
