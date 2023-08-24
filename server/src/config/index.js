import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,

  URL1: process.env.LIVE_URL1,
  URL2: process.env.LIVE_URL2,

  MONGO_URL: process.env.MONGO_URL,
};
export default config;
