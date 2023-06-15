import { Container, CosmosClient } from "@azure/cosmos";
import config from "config";

export const getContainer = async function (): Promise<Container> {
  const connectionString: string = config.get<string>("DBconnectionString");

  const client = new CosmosClient(connectionString);

  let createContainer = await client
    .database("registrations")
    .containers.createIfNotExists({ id: "registrations", partitionKey: "/id" });

  let container = client.database("registrations").container("registrations");

  client.dispose();
  return container;
};
