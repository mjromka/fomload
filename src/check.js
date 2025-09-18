import redis from "k6/experimental/redis";
import constants from "./constants.js";

export default async function () {
  try {
    const client = new redis.Client(__ENV.REDIS_URL);

    console.log(
      `✅ ~ ${await client.llen(constants.REDIS_LIST_NAME)} URLs in Redis`
    );
  } catch (error) {
    console.error("❌ ~ check", error);
  }
}
