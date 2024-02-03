import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import ConnectDB from "./db/index";
import bodyParser from "body-parser";
import Router from "./routes/routes";

dotenv.config({
  path: "./env",
});

const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

console.log("before");
const PORT = 5000;

ConnectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running successfully on PORT ${PORT}`)
    );
  })

  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });
