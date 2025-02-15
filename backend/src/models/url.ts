import mongoose from "mongoose";

interface IURL {
    originalURL: string;
    shortCode: string;
    createdAt: Date;
    clicks: number;
}

const urlSchema = new mongoose.Schema<IURL>({
    originalURL:
    {
        type: String,
        required: true
    },
    shortCode:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    clicks:
    {
        type: Number,
        default: 0
    }   
});

export default mongoose.model<IURL>("URL", urlSchema);