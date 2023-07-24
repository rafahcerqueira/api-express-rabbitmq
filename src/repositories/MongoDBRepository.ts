import { Log } from "../api/models/Log";
import { LogRepository } from "./LogRepository";
import LogSchema from "../api/database/schemas/LogSchema";

export class MongoDBRepository implements LogRepository {
  async saveLog(logData: Log): Promise<void> {
    const logInstance = new LogSchema({
      carId: logData.car_id,
      dateTime: logData.date_time,
    });

    await logInstance.save();
  }

  async getLogs(): Promise<Log[]> {
    const logs = await LogSchema.find();

    const logData: Log[] = logs.map((logDoc) => ({
      id: logDoc.id,
      car_id: logDoc.car_id,
      date_time: logDoc.date_time,
    }));

    return logData;
  }
}
