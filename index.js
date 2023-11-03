import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
// import Joi from "joi";
// import Brevo from "@getbrevo/brevo";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Tako Dev backend. Follow the white rabbit.");
});

app.listen(process.env.PORT, () =>
  console.log(`Application started on port: ${process.env.PORT}`)
);
