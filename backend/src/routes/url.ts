import { Router } from "express";
import URL from "../models/url";

const router = Router();

//generate shortcode
const generateShortCode = (): string => {
    return Math.random().toString(36).substring(2,8)
}

//API endpoint for url shortening
//POST /api/shorten
router.post("/shorten", async (req, res) => {
    try{
        const {originalURL} = req.body;

        if (!originalURL){
            return res.status(400).json({message: "No url found"});
        }

        let shortCode = ""
        let existingURL = null;
        //create a new shortCode and check if it exists in mongoDB already
        //if so, create a new one
        do {
            shortCode = generateShortCode();
            existingURL = await URL.findOne({shortCode})
        } while(existingURL)
        
        //create new record
        const newURL = new URL({originalURL, shortCode});
        await newURL.save();
        console.log("url saved");

        //send success response
        return res.status(201).json({
            shortCode: newURL.shortCode,
            originalURL: newURL.originalURL
        });

    } catch(error){
        console.error(error);
        return res.status(500).json({error: "Server error"});
    }
});


//API endpoint for redirecting the shortcode url to long url
//GET /:shortCode
router.get("/:shortCode", async (req, res) => {
    try{
        console.log("endpoint accessed")
        const {shortCode} = req.params;
        const urlDoc = await URL.findOne({shortCode});

        if(!urlDoc){
            return res.status(400).json({message: "No url found"});
        }

        return res.redirect(urlDoc.originalURL)
    } catch(error){
        console.error(error);
        return res.status(500).json({error: "Server error"});
    }
});

export default router