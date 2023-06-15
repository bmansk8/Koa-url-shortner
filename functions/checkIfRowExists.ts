import { Container, SqlQuerySpec } from "@azure/cosmos";
import { getContainer } from "./db/getContainer";
import { checkIfRowExistsInDB } from "./db/checkIfRowExistsInDB";

export async function checkIfRowExists(
  key: string,
): Promise<boolean> {
  let container: Container = await getContainer();

  const query: SqlQuerySpec = {
    query: `SELECT * FROM c WHERE c.id='${key}'`,
  };

  const rowExistance = await checkIfRowExistsInDB(container, query);
  
  return rowExistance;
}
