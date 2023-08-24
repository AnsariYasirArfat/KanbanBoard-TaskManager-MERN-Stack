import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("DB Connected!");

    app.on("error", (err) => {
      console.error("ERROR: ", err);
      throw err;
    });

    const onListening = () => {
      console.log(`listening on port ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (err) {
    console.error("ERROR: ", err);
    throw err;
  }
})();
