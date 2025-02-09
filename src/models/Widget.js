import mongoose from "mongoose";
import { type } from "os";

const widgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["whatsapp", "call", "custom"], required: true },
    label: { type: String, require: true },
    domain: { type: [String], required: true },
    widgetToken: { type: String, required: true },
    link: {
        type: String,
        require: true
    },
    onlyIcon: { type: Boolean },
    color: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    shape: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    isActive: { type: Boolean, default: true },

    displayConditions: {
        showAfterSeconds: { type: Number, default: 0 },
        hideAfterScrollPercentage: { type: Number, default: 100 },
        showOnlyOnDevices: { type: [String], enum: ["mobile", "desktop", "tablet"], default: ["mobile", "desktop"] },
        showOnPages: { type: [String], default: [] },
        hideOnPages: { type: [String], default: [] }
    },

    // eventTriggers: {
    //     onPageLoad: { type: Boolean, default: false },
    //     onExitIntent: { type: Boolean, default: false },
    //     onIdleTime: { type: Number, default: 0 },
    //     onScrollPercentage: { type: Number, default: 0 },
    //     onButtonClick: {
    //         selector: { type: String, default: "" },
    //         delaySeconds: { type: Number, default: 0 }
    //     },
    //     onCustomEvent: {
    //         eventName: { type: String, default: "" },
    //         delaySeconds: { type: Number, default: 0 }
    //     },
    // },

    schedule: {
        enabled: { type: Boolean, default: false },
        timezone: { type: String, default: "UTC" },
        days: {
            monday: { start: String, end: String },
            tuesday: { start: String, end: String },
            wednesday: { start: String, end: String },
            thursday: { start: String, end: String },
            friday: { start: String, end: String },
            saturday: { start: String, end: String },
            sunday: { start: String, end: String }
        },
        holidays: [
            {
                date: { type: String, required: true }, // "YYYY-MM-DD"
                reason: { type: String, required: true }
            }
        ],
        customDateVisibility: {
            showOnDates: [
                {
                    start: { type: String, required: true }, // "YYYY-MM-DD"
                    end: { type: String, required: true } // "YYYY-MM-DD"
                }
            ],
            hideOnDates: [
                {
                    start: { type: String, required: true },
                    end: { type: String, required: true }
                }
            ],
            recurringRules: {
                weekly: { type: [String], enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] },
                monthly: { type: [Number], min: 1, max: 31 },
                yearly: { type: [String] }, // Format: "MM-DD"
                timeBased: {
                    intervalHours: { type: Number, min: 1, max: 24 },
                    startTime: { type: String, default: "00:00" },
                    endTime: { type: String, default: "23:59" }
                }
            }
        }
    },
}, { timestamps: true });

export default mongoose.model("Widget", widgetSchema);



// {
//     "_id": "ObjectId",
//     "userId": "ObjectId",
//     "type": "whatsapp",
//     "label": "Chat with us!",
//     "link": "https://wa.me/1234567890",
//     "color": "#10B981",
//     "icon": "whatsapp",
//     "size": "medium",
//     "shape": "round",
//     "position": "bottom-right",
//     "animation": "bounce",
//     "customCSS": "",
//     "isActive": true,
//     "displayConditions": {
//       "showAfterSeconds": 5,
//       "hideAfterScrollPercentage": 50,
//       "showOnlyOnDevices": ["mobile", "desktop"],
//       "showOnPages": ["/home", "/contact"],
//       "hideOnPages": ["/checkout"]
//     },
//     "eventTriggers": {
//       "onPageLoad": true,
//       "onExitIntent": true,
//       "onIdleTime": 30,
//       "onScrollPercentage": 60,
//       "onButtonClick": {
//         "selector": "#contact-us",
//         "delaySeconds": 2
//       },
//       "onCustomEvent": {
//         "eventName": "addToCart",
//         "delaySeconds": 3
//       }
//     },
//     "schedule": {
//       "enabled": true,
//       "timezone": "Asia/Kolkata",
//       "days": {
//         "monday": { "start": "09:00", "end": "18:00" },
//         "tuesday": { "start": "09:00", "end": "18:00" },
//         "wednesday": { "start": "09:00", "end": "18:00" },
//         "thursday": { "start": "09:00", "end": "18:00" },
//         "friday": { "start": "09:00", "end": "18:00" },
//         "saturday": { "start": "10:00", "end": "16:00" },
//         "sunday": { "start": null, "end": null }
//       },
//       "holidays": [
//         { "date": "2024-12-25", "reason": "Christmas" },
//         { "date": "2025-01-01", "reason": "New Year" }
//       ],
//       "customDateVisibility": {
//         "showOnDates": [
//           { "start": "2024-03-01", "end": "2024-03-15" },
//           { "start": "2024-05-01", "end": "2024-05-10" }
//         ],
//         "hideOnDates": [
//           { "start": "2024-07-01", "end": "2024-07-05" }
//         ],
//         "recurringRules": {
//           "weekly": ["monday", "friday"],
//           "monthly": [1, 15, 30],
//           "yearly": ["03-10", "12-25"],
//           "timeBased": {
//             "intervalHours": 2,
//             "startTime": "08:00",
//             "endTime": "20:00"
//           }
//         }
//       }
//     },
//     "createdAt": "2024-02-07T12:00:00Z",
//     "updatedAt": "2024-02-07T12:10:00Z"
//   }
