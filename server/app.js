import db from './database';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import boom from 'koa-boom';

import { resources } from './util/createMiddleware';

const app = new Koa();
app.context.db = db;

app
  .use(bodyparser())
  .use(...resources('users'))

app.listen(3000);