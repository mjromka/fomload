import { browser } from "k6/browser";
import { sleep } from "k6";
import redis from "k6/experimental/redis";
import constants from "./constants.js";

export const options = {
  scenarios: {
    ui: {
      executor: "ramping-vus",
      stages: [
        { duration: "5s", target: 4 },
        { duration: "5s", target: 8 },
        { duration: "5s", target: 12 },
        { duration: "5s", target: 16 },
        { duration: "5s", target: 20 },
        { duration: "5s", target: 24 },
        { duration: "5s", target: 28 },
        { duration: "5s", target: 32 },
        { duration: "5s", target: 36 },
        { duration: "5s", target: 40 },
        { duration: "3550s", target: 40 }, // Maintain 40 users for remaining time
      ],
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export default async function () {
  await openMeeting();
}

async function openMeeting() {
  const page = await browser.newPage();

  try {
    // take free URL
    const client = new redis.Client(constants.REDIS_URL);
    let url = await client.lpop(constants.REDIS_LIST_NAME);
    console.log("👨‍💻 ~ url taken: " + url);

    // open a new page
    await page.goto(url);

    // stay online
    sleep(3600);
  } catch (error) {
    console.error("❌ ~ test", error);
  }
}
