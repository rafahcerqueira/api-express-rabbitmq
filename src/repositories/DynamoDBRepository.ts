import { Log } from "../api/models/Log";
import { LogRepository } from "./LogRepository";
import LogSchema from "../api/database/schemas/LogSchema";

export class DynamoDBRepository implements LogRepository {
  async saveLog(logData: Log): Promise<void> {
    // Crie uma instância do modelo LogSchema com os dados do log
    const logInstance = new LogSchema({
      carId: logData.car_id,
      dateTime: logData.date_time,
    });

    // Salve a instância do log no banco de dados
    await logInstance.save();
  }

  async getLogs(): Promise<Log[]> {
    // Obtenha todos os logs da coleção do DynamoDB
    const logs = await LogSchema.find();

    // Converta os documentos do DynamoDB para objetos da interface Log
    const logData: Log[] = logs.map((logDoc) => ({
      id: logDoc.id,
      car_id: logDoc.car_id,
      date_time: logDoc.date_time,
    }));

    return logData;
  }
}
