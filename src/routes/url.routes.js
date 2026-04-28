import express from "express";
import {
  shortenUrl,
  redirectUrl,
  getTopUrls,
} from "../controllers/url.controller.js";
import { limiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/shorten",limiter,shortenUrl);
router.get("/top", getTopUrls);
router.get("/:code",limiter,redirectUrl);

export default router;