import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      message: "Limit reached: Only 5 requests per minute allowed"
    });
  }
});