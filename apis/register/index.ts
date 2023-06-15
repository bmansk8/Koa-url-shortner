import Router from "@koa/router";
import Koa from "koa";
import { checkIfRowExists } from "../../functions/checkIfRowExists";
import { createKeyInDB } from "../../functions/db/createKeyInDB";
import { isValidHttpUrl } from "../../functions/isValidHttpUrl";
import { keygen } from "../../functions/keyGenerator";
import { ApiCall } from "../../classes/classes";

export const register = async function (
  params: ApiCall,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> {
  console.log("Url registration triggered");
  if(params.customName && params.customName.length > 10){
    ctx.response.body = "Custom key/id is to long. Key can only be 10 or less characters";
    ctx.status = 400;
    return
  }

  if (params.url === undefined) {
    ctx.response.body = "Please pass a url to shorten";
    ctx.status = 400;
  } else {
    if (params.customName) {
     await handleReturn(params.url, ctx, params.customName, true);
    } else {
     const uniqueKey = keygen();
     await handleReturn(params.url, ctx, uniqueKey);
    }
  }
};

async function handleReturn(
  apiCallUrl: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >,
  key: string,
  customKey: boolean = false
): Promise<void> {
  const validUrl = isValidHttpUrl(apiCallUrl);

  if (validUrl != true) {
    ctx.status = 400;
    ctx.response.body =
      "Use a url that has the correct syntax. Example: Https://www.somewhere.com";
  }

  if (customKey) {
   await handleCustomKey(apiCallUrl, key, ctx);
  } else {
   await handleGeneratedKey(apiCallUrl, key, ctx);
  }
}

async function handleCustomKey(
  apiCallUrl: string,
  key: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
) {
  let doesKeyAlreadyExist = await checkIfRowExists(key);

  if (doesKeyAlreadyExist == false) {
    await createKeyInDB(apiCallUrl, key);

    ctx.response.body = `${key} created`;
    ctx.status = 200;
  } else {
    ctx.response.body = "url key is already in use";
    ctx.status = 400;
  }
}

async function handleGeneratedKey(
  apiCallUrl: string,
  key: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
) {
  let doesKeyAlreadyExist = await checkIfRowExists(key);

  if (doesKeyAlreadyExist == false) {
    createKeyInDB(apiCallUrl, key);

    ctx.status = 200;
    ctx.response.body = `${key} created`;
  } else {
   await handleMakingAnotherKey(apiCallUrl, ctx);
  }
}

async function handleMakingAnotherKey(
  apiCallUrl: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
) {
  let newKey = keygen();
  let doesKeyAlreadyExist = await checkIfRowExists(newKey);

  if (doesKeyAlreadyExist == false) {
    createKeyInDB(apiCallUrl, newKey);

    ctx.response.body = `${newKey} created`;
    ctx.status = 200;
  } else if (doesKeyAlreadyExist == true) {
    console.log(
      "only duplicate keys could be generated. The key generator needs to be updated, or the db is too full of keys"
    );

    ctx.status = 500;
    ctx.response.body = "server cannot make uniuqe key";
  }
}
