import shortid from "shortid";
import { Url } from "../models/url.model.js";

//  SHORTEN URL
export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "URL is required" });
    }

    if (!originalUrl.startsWith("http")) {
      return res.status(400).json({
        message: "Invalid URL. Must start with http or https"
      });
    }

    const shortCode = shortid.generate();

    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error"
    });
  }
};


//  REDIRECT 
export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Track clicks (simple analytics)
    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);

  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error"
    });
  }
};


//  TOP 10 URLs
export const getTopUrls = async (req, res) => {
  try {
    const urls = await Url.find()
      .sort({ clicks: -1 })
      .limit(10);

    return res.json(urls);

  } catch (err) {
    return res.status(500).json({
      message: err.message || "Error fetching data"
    });
  }
};

