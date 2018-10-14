const Koa = require('koa');
const logger = require('koa-logger');
const asyncJSON = require('async-json');

const response = require('./lib/response');
const config = require('./lib/config');

const app = module.exports = new Koa();

const cfg = config(process.env);

app.use(logger());

app.use(async function (ctx) {
    ctx.body =  await asyncJSON.stringify(response(cfg));
});


if (!module.parent) app.listen(3000);