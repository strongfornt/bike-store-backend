import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`server listening on ${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

main();
