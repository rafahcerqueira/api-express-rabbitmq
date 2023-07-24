import amqp from "amqplib";

const queue = "car_created";
let channel: amqp.Channel;

async function connect(): Promise<void> {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });
}

export { connect, channel, queue };
