import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "design-patterns-app",
  brokers: ["localhost:9092"]
});

const topics = {
  default: "test"
};

const makeProducer = async () => {
  const producer = kafkaClient.producer();

  await producer.connect();
  return {
    send: async (payload) => {
      console.log("sending...");
      await producer.send({
        topic: topics.default,
        messages: [{ value: payload, partition: 0 }]
      });
      console.log("ok!");
    },
    disconnect: () => producer.disconnect()
  };
};

export const boot = async () => {
  const producer1 = await makeProducer();
  await producer1.send("sending-msg");
};
