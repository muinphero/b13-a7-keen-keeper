import { readFile } from "fs/promises";
import path from "path";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFriends() {
  const filePath = path.join(process.cwd(), "data", "friends.json");
  const [raw] = await Promise.all([
    readFile(filePath, "utf8"),
    wait(350),
  ]);

  return JSON.parse(raw);
}
