"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = __importDefault(require("../models/url"));
const router = (0, express_1.Router)();
//generate shortcode
const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
};
//API endpoint for url shortening
//POST /api/shorten
router.post("/shorten", async (req, res) => {
    try {
        const { originalURL } = req.body;
        if (!originalURL) {
            return res.status(400).json({ message: "No url found" });
        }
        let shortCode = "";
        let existingURL = null;
        //create a new shortCode and check if it exists in mongoDB already
        //if so, create a new one
        do {
            shortCode = generateShortCode();
            existingURL = await url_1.default.findOne({ shortCode });
        } while (existingURL);
        //create new record
        const newURL = new url_1.default({ originalURL, shortCode });
        await newURL.save();
        //send success response
        return res.status(201).json({
            shortCode: newURL.shortCode,
            originalURL: newURL.originalURL
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
//API endpoint for redirecting the shortcode url to long url
//GET /:shortCode
router.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;
        const urlDoc = await url_1.default.findOne({ shortCode });
        if (!urlDoc) {
            return res.status(400).json({ message: "No url found" });
        }
        return res.redirect(urlDoc.originalURL);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
