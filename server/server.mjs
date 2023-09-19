import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import router from "./routes/tasks.mjs";

const PORT = process.env.PORT || 3003;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", router);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});