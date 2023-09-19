import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import router from "./routes/tasks.mjs";
import db from "./db/conn.mjs";

const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000" || process.env.CYCLIC_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/tasks", router);

if(db){
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
} else {
  throw new Error('db not connected')
}