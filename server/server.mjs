import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import "./loadEnvironment.mjs";
import router from "./routes/tasks.mjs";
import db from "./db/conn.mjs";

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000" , process.env.CYCLIC_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/tasks", router);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

if(db){
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
} else {
  throw new Error('db not connected')
}