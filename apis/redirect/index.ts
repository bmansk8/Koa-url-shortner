import Koa from "koa";
import Router from "@koa/router";
import { getContainer } from "../../functions/db/getContainer";
import { SqlQuerySpec } from "@azure/cosmos";

export const redirect = async (
  key: string,
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext &
      Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
): Promise<void> => {
  console.log("redirect triggered");

  const query: SqlQuerySpec = {
    query: `SELECT * FROM c WHERE c.id='${key}'`,
  };

  const container = await getContainer()
  let collection = await container.items.query(query).fetchAll();

  if (collection.resources.length === 1) {
    const urlToRedirectoTo = collection.resources[0].url;

    ctx.status = 301;
    ctx.response.redirect(urlToRedirectoTo)
  }else{
    ctx.response.body = "error key does not exist"
    ctx.response.status = 400;
  }
};
