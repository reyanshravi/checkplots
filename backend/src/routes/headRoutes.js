import express from "express";
import { signInHead, signUpHead } from "../controllers/authHeadController.js";

const headRoute = express.Router();

headRoute.post("/signin", signInHead);
headRoute.post("/signup", signUpHead);
headRoute.get("/test", (req, res) => {
  res.send("Head route is working");
});

export default headRoute;
