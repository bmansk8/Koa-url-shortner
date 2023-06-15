import { getContainer } from "./getContainer";

export async function createKeyInDB(url: string, key: string) {
  const container = await getContainer();

  try {
    container.items.create({ url: url, id: key });
  } catch (error) {
    console.log(error);
  }
}
