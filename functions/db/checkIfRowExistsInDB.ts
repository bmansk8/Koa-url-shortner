import { Container, SqlQuerySpec } from "@azure/cosmos";

export const checkIfRowExistsInDB = async function (
  container: Container,
  query: SqlQuerySpec
) {
  let keyExistance: boolean = true;

  try {
    let entry = await container.items.query(query).fetchAll();

    if (entry.resources.length >= 1) {
      keyExistance = true;
    } else {
      keyExistance = false;
    }
  } catch (error) {
    console.log(error);
  }

  return keyExistance;
};
