import { CosmosClient } from "@azure/cosmos";
import config from "config";

export function createContainer(containerName : string): void {
  const connectionString: string = config.get<string>("DBconnectionString");

  const client = new CosmosClient(connectionString);

  try {
    client.database("registrations").containers.create({ id: containerName });
  } catch (error) {
    console.log(error);
  }

  client.dispose()
}
