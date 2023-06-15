import { CosmosClient } from "@azure/cosmos";
import { ApiCall } from "../../classes/classes";
import { checkIfRowExists } from "../../functions/checkIfRowExists";
import config from "config";
import Koa from "koa";
import Router from "@koa/router";

const connectionString = config.get<string>("DBconnectionString");
const client = new CosmosClient(connectionString);
const container = client.database("registrations").container("registrations");

export async function remove(
  apiCall: ApiCall,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  console.log("delete triggered");

  if (apiCall.key) {
    await handleReturn(apiCall.key, ctx);
  } else {
    ctx.status = 400;
    ctx.response.body = "please key/id to delete";
  }
}

async function handleReturn(
  key: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  let doesKeyAlreadyExist = await checkIfRowExists(key);

  if (doesKeyAlreadyExist === true) {
    try {
        container.item(key, key).delete();

        ctx.status = 200;
        ctx.response.body = "key deleted";
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.response.body = "server was unable to remove item from database"     
    }
  } else {
    ctx.status = 400;
    ctx.response.body = "unique key/id does not exist";
  }
}
