import { ApiCall } from "../../classes/classes";
import { checkIfRowExists } from "../../functions/checkIfRowExists";
import { isValidHttpUrl } from "../../functions/isValidHttpUrl";
import Koa from "koa";
import Router from "@koa/router";
import { PatchRequestBody } from "@azure/cosmos";
import { getContainer } from "../../functions/db/getContainer";

export async function update(
  apiCall: ApiCall,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  console.log("Url patch triggered");

  if (apiCall.url != undefined && apiCall.key != undefined) {
    await handleReturn(apiCall.url, apiCall.key, ctx);
  } else {
    ctx.status = 400;
    ctx.response.body = "Please pass a url, and url key to update";
  }
}

async function handleReturn(
  apiCallUrl: string,
  key: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  const validUrl = isValidHttpUrl(apiCallUrl);
  let doesKeyAlreadyExist = await checkIfRowExists(key);

  if (validUrl && doesKeyAlreadyExist === true) {
    await updateKeyInDB(key, apiCallUrl, ctx);
  } else if (doesKeyAlreadyExist === false) {
    ctx.status = 400;
    ctx.response.body = "shortened url key dose not exist";
  } else if (validUrl != true) {
    ctx.status = 400;
    ctx.response.body =
      "Use a url that has the correct syntax. Example: Https://www.somewhere.com";
  }
}

async function updateKeyInDB(
  key: string,
  url: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  const container = await getContainer();

  const operations: PatchRequestBody = [
    { op: "replace", path: "/url", value: url },
  ];

  try {
    container.item(key, key).patch(operations);

    ctx.status = 200;
    ctx.response.body = `${key} updated to ${url}`;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.response.body = "server was unable to patch entry in database";
  }
}
