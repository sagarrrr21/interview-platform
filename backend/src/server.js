import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Success from backend" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => console.log("Server is running on port 3000"));
  } catch (errr) {
    console.error("Error starting the server", errr);
  }
};

startServer();
