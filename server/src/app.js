import express from "express";
import cors from "cors";
import config from "./config/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [config.URL1, config.URL2],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.send("Hello From Backend Server!");
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
