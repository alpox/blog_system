/**
 * Entry file for the app
 * @module app.js
 * @author Elias Bernhaut
 */

import db from "./database";
import Koa from "koa";
import bodyparser from "koa-bodyparser";
import Router from "koa-router";
import boom from "koa-boom";

import users from "./controllers/users";

const app = new Koa();
app.context.db = db;

app
  .use(bodyparser())
  .use(...users);

app.listen(3000);
