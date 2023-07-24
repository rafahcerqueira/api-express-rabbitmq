import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Car } from "../models/Car";
import { Log } from "../models/Log";
import LogModel from "../database/schemas/LogSchema";
import { LogRepository } from "../../repositories/LogRepository";

export class CarService {
  private logRepository: LogRepository;

  constructor(logRepository: LogRepository) {
    this.logRepository = logRepository;
  }

  async getListCars(): Promise<Car[]> {
    const externalApiUrl = "http://api-test.bhut.com.br:3000/api/cars";
    const response = await axios.get(externalApiUrl);
    return response.data;
  }

  async createCar(carData: Car): Promise<void> {
    const externalApiUrl = "http://api-test.bhut.com.br:3000/api/cars";
    const response = await axios.post(externalApiUrl, carData);

    if (carData) {
      const logData: Log = {
        id: uuidv4(),
        car_id: response.data._id,
        date_time: new Date(),
      };

      const logDocument = new LogModel(logData);
      await logDocument.save();
    } else {
      console.error("ID do carro não encontrado ou vazio:", response.data);
    }
  }
}
