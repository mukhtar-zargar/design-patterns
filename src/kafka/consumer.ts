import { Kafka, logLevel } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "design-patterns-app",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN
});

const topics = {
  default: "test"
};

const consumer = kafkaClient.consumer({
  groupId: "design-patterns-client",
  minBytes: 5,
  maxBytes: 1e6,
  // wait for at most 3 seconds before receiving new data
  maxWaitTimeInMs: 3000
});

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: topics.default, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`Received message: ${message.key}: ${message.value}`);
    }
  });
};

consume().catch((err) => {
  console.error("error in consumer: ", err);
});
