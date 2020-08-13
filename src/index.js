const { promisify } = require("util");
const express = require('express')
const redis = require("redis");
const app = express()

const port = process.env.WEB_PORT;
const redisHost = process.env.REDIS_HOST;

const client = redis.createClient({ host: redisHost });
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on("error", function (error) {
  console.error(error);
});

app.get('/', async (req, res) => {
  const value = await getAsync("hit");

  res.send(`Hello World!  ${value} hits`);
})

app.get('/hit', async (req, res) => {
  const value = parseInt(await getAsync("hit"), 10) || 0;
  await setAsync("hit", value + 1);

  res.send(`Hit recorded!`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})