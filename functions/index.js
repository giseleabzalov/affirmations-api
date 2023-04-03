import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  addAffirmation,
  getOneAffirmation,
  getAllAffirmations,
  deleteAffirmation,
} from "./src/affirmations.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/affirmations", addAffirmation);
app.get("/affirmations", getAllAffirmations);
app.get("/affirmations/:author", getOneAffirmation);
app.delete("/affirmations/:id", deleteAffirmation);

export const api = functions.https.onRequest(app);
