import { Log } from "../api/models/Log";

export interface LogRepository {
  saveLog(logData: Log): Promise<void>;
  getLogs(): Promise<Log[]>;
}
