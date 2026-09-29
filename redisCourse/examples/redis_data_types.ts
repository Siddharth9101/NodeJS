/**
 * string
 * hash
 * list
 * set
 * sorted set
 * ttl
 */

import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

const redis = createClient({ url: redisUrl });

async function run() {
  await redis.connect();
  console.log("connected to redis");
  console.log("Ping", await redis.ping());
}

run()
  .then(() => {
    // stringExample();
    // hashExample();
    // listExample();
    // setExample();
    // sortedSetExample();
    ttlExample();
  })
  .catch((err) => {
    console.log("demo failed, err", err);
    process.exit(1);
  });

async function stringExample() {
  //string - stores one value under one key, ex - plain text, numbers as text, counters

  const stringKey = "demo:page_views";

  await redis.set(stringKey, "100");

  const pageViews = await redis.get(stringKey);

  console.log(pageViews);

  // redis strings also work as counters

  const incrViews = await redis.incr(stringKey);

  console.log(incrViews);
}

async function hashExample() {
  // hash - stores many small fields under one key, ex - object or map

  const hashKey = "hashKey";

  await redis.hSet(hashKey, {
    name: "siddharth",
    city: "bly",
  });

  const profile = await redis.hGetAll(hashKey);

  console.log(profile);
}

async function listExample() {
  // list - ordered collection of values
  const listKey = "listKey";
  await redis.lPush(listKey, "hello");
  // lPush - inserts from left, rPush - inserts from right
  await redis.lPush(listKey, "hi redis!");

  console.log(await redis.lRange(listKey, 0, -1));
  console.log(await redis.lPop(listKey));
}

async function setExample() {
  // set - stores distint elements only
  const setKey = "tags";

  await redis.sAdd(setKey, "react");
  await redis.sAdd(setKey, "node");
  await redis.sAdd(setKey, "node");

  console.log(await redis.sCard(setKey));
  // ignores the repeated element
}

async function sortedSetExample() {
  const rankKey = "leaderborad";

  await redis.zAdd(rankKey, { score: 100, value: "player_a" });
  await redis.zAdd(rankKey, { score: 200, value: "player_b" });

  console.log(await redis.zIncrBy(rankKey, 50, "player_a"));
}

async function ttlExample() {
  // ttl - time to live
  const otpKey = "otp";
  await redis.set(otpKey, "123456");
  await redis.expire(otpKey, 60);

  console.log(await redis.ttl(otpKey));
  redis.quit();
}
