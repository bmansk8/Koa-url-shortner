import { checkIfRowExists } from "../functions/checkIfRowExists";
import { checkIfRowExistsInDB } from "../functions/db/checkIfRowExistsInDB";
import { getContainer } from "../functions/db/getContainer";

jest.mock('@azure/cosmos')

jest.mock("../functions/db/checkIfRowExistsInDB");
jest.mock("../functions/db/getContainer");

const mockCheckIfRowExistsInDB = checkIfRowExistsInDB as jest.MockedFunction<
  typeof checkIfRowExistsInDB
>;

const mockContainer = getContainer as jest.MockedFunction<typeof getContainer>;

test("should return true when row exists", async () => {
  mockCheckIfRowExistsInDB.mockResolvedValueOnce(true);

  expect(await checkIfRowExists("123")).toBeTruthy();
});

test("should return false when row does not exist", async () => {
  mockCheckIfRowExistsInDB.mockResolvedValueOnce(false);

  expect(await checkIfRowExists("1234")).toBeFalsy();
});
