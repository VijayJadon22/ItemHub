import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";

const app = express();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.listen(3001, () => {
  console.log("Listening on PORT: 3001");
});
