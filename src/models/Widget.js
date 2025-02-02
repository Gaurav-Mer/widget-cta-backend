import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["whatsapp", "call", "custom"], required: true },
    position: { type: String, enum: ["left", "right", "bottom-left", "bottom-right"], required: true },
    script: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Widget", widgetSchema);
