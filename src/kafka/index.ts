import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "design-patterns-app",
  brokers: ["localhost:9092"]
});

const topics = {
  default: "test"
};

const getRandomNumber = () => Math.round(Math.random() * 1000);
const createMessage = (num) => ({
  key: `key-${num}`,
  value: `value-${num}-${new Date().toISOString()}`,
  headers: {
    "correlation-id": `${num}-${Date.now()}`
  }
});

let msgNumber = 0;
let requestNumber = 0;

const makeProducer = async () => {
  const producer = kafkaClient.producer();

  await producer.connect();
  return {
    send: async (payload) => {
      const messages = Array(getRandomNumber())
        .fill(null)
        .map((_) => createMessage(getRandomNumber()));

      const requestId = requestNumber++;
      msgNumber += messages.length;
      kafkaClient
        .logger()
        .info(`Sending ${messages.length} messages #${requestId}...`);

      console.log("sending...");
      await producer.send({
        topic: topics.default,
        messages: messages
      });
      console.log("sent: ok!");
    },
    disconnect: () => producer.disconnect()
  };
};

let intervalId;
export const boot = async () => {
  const producer1 = await makeProducer();
  intervalId = setInterval(() => producer1.send("sending-msg"), 3000);
  // await producer1.send("sending-msg");
};

// const errorTypes = ["unhandledRejection", "uncaughtException"];
// const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// errorTypes.map((type) => {
//   process.on(type, async (e) => {
//     try {
//       kafkaClient.logger().info(`process.on ${type}`);
//       kafkaClient.logger().error(e.message, { stack: e.stack });
//       await producer.disconnect();
//       process.exit(0);
//     } catch (_) {
//       process.exit(1);
//     }
//   });
// });

// signalTraps.map((type) => {
//   process.once(type, async () => {
//     console.log("");
//     kafkaClient.logger().info("[example/producer] disconnecting");
//     clearInterval(intervalId);
//     await producer.disconnect();
//   });
// });
