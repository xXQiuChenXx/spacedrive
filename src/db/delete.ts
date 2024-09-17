import { db } from ".";
import { user } from "./schema";

async function deleteData() {
  console.log("⏳ Clearing data...");
  await db.delete(user);
  console.log(`✅ Completed`);
  process.exit(0);
}

deleteData();
