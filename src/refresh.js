import redis from "k6/experimental/redis";
import constants from "./constants.js";

const data = open("../assets/links.txt").split("\n").filter(Boolean);

export default async function () {
  try {
    const client = new redis.Client(__ENV.REDIS_URL);

    console.log("🧹 ~ wipe old data");
    await client.del(constants.REDIS_LIST_NAME);

    console.log(`⏳ ~ pushing new data: ${data.length} URLs`);
    for (const url of data) {
      await client.lpush(constants.REDIS_LIST_NAME, url);
    }
    console.log(
      `💾 ~ ${await client.llen(constants.REDIS_LIST_NAME)} URLs in Redis`
    );
  } catch (error) {
    console.error("❌ ~ refresh", error);
  }
}
