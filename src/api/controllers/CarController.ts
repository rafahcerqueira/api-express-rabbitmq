import amqp from "amqplib";
import { Car } from "../models/Car";
import { Request, Response } from "express";
import { CarService } from "../services/CarService";
import { MongoDBRepository } from "../../repositories/MongoDBRepository";

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
    const carData: Car = request.body;
    await carService.createCar(carData);

    // Postando informações do carro criado para uma fila no rabbitmq

    const queue = "car_created";
    const text = {
      item: carData,
      text: "Car created",
    };

    (async () => {
      let connection;
      try {
        connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
        console.log(" [x] Sent '%s'", text);
        await channel.close();
      } catch (err) {
        console.warn(err);
      } finally {
        if (connection) await connection.close();
      }
    })();

    response.json({ message: "Car created successfully!" });
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};
