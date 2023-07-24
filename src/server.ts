import express from "express";
import mongoose from "mongoose";
import { connect } from "./rabbit";
import routes from "./api/routes/routes";
import "./listener";

const app = express();

// Conexão com o banco de dados MongoDB
mongoose
  .connect("mongodb://localhost/carlogs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Conexão com o RabbitMQ
connect();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("Server running on port 3333"));
