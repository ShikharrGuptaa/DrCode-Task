import mongoose from "mongoose";

import app from "./app.js";
import { env } from "./config/index.js";

const startServer = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};

startServer();
