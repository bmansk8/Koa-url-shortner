import { redirect } from "./apis/redirect";
import { register } from "./apis/register";
import { remove } from "./apis/remove";
import { update } from "./apis/update";

import { ApiCall } from "./classes/classes";

import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

const router = new Router();
const App = new Koa();

App.use(bodyParser());
//body parser needs to be before the router, or it's stuff will be overwritten
App.use(router.routes()).use(router.allowedMethods());

App.listen(3000);

let routeRegex = RegExp("/S*");

router.get('/', async (ctx, next)=>{
  ctx.response.body = 'api is running'
  ctx.response.status = 200;
  return;
})

router.post("/", async (ctx, next) => {

  if (ctx.request.body) {
    const apiCall = new ApiCall(
      typeof ctx.request.body.url === 'string' ? ctx.request.body.url : undefined,
      typeof ctx.request.body.key === 'string' ? ctx.request.body.key : undefined,
      typeof ctx.request.body.customName === 'string' ? ctx.request.body.customName : undefined,
    );
    await register(apiCall, ctx);
  }
});

router.patch("/", async (ctx, next) => {
  if (ctx.request.body) {
    const apiCall = new ApiCall(
      typeof ctx.request.body.url === 'string' ? ctx.request.body.url : undefined,
      typeof ctx.request.body.key === 'string' ? ctx.request.body.key : undefined,
      typeof ctx.request.body.customName === 'string' ? ctx.request.body.customName : undefined,
    );
    await update(apiCall, ctx);
  }
});

router.delete("/", async (ctx, next) => {
  if (ctx.request.body) {
    const apiCall = new ApiCall(
      typeof ctx.request.body.url === 'string' ? ctx.request.body.url : undefined,
      typeof ctx.request.body.key === 'string' ? ctx.request.body.key : undefined,
      typeof ctx.request.body.customName === 'string' ? ctx.request.body.customName : undefined,
    );
    await remove(apiCall, ctx);
  }
});

router.get(routeRegex, async (ctx, next) => {
  let key = ctx.request.URL.pathname;

  if (key.length <= 1) {
    ctx.response.status = 400;
  } else {
    //removes the / slash in the urk/key so it can be used in the redirect function
    key = key.replace("/", "");
    await redirect(key, ctx);
  }
});