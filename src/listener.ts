import amqp from "amqplib";
import { queue } from "./rabbit";
import { CarService } from "./api/services/CarService";
import { MongoDBRepository } from "./repositories/MongoDBRepository";

const carService = new CarService(new MongoDBRepository());

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.consume(
      queue,
      async (message) => {
        if (message) {
          const data = JSON.parse(message.content.toString());
          console.log(" [x] Received '%s'", data);

          try {
            await carService.createCar(data);
            console.log(" Webhook enviado.");
          } catch (error) {
            console.error(" Erro ao enviar webhook:", error);
          }
        }
      },
      { noAck: true }
    );
  } catch (err) {
    console.warn(err);
  }
})();
