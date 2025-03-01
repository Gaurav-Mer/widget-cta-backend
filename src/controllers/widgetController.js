import Widget from "../models/Widget.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateWidgetToken, getDomainName } from "../utils/index.js";


export const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' });
        }
        req.user = user;
        next();
    });
};


export const createWidget = async (req, res) => {
    const { domain, type, position, label, link, color, size, shape, onlyIcon, name } = req.body;
    try {
        if (!Array.isArray(domain) || domain.length === 0) {
            return res.status(400).json({ message: "Domain is required", isSuccess: false });
        }

        const widget = new Widget({ user: req.user.id, domain, type, position, link, color, label, size, shape, isActive: true, onlyIcon, name });

        const widgetSecret = crypto.randomBytes(32).toString("hex"); // Unique per widget
        const widgetToken = generateWidgetToken(widget?._id?.toString(), widgetSecret);
        widget.widgetToken = widgetToken;

        await widget.save();

        res.status(201).json({ message: "Widget created successfully", data: widget, isSuccess: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const editWidget = async (req, res) => {
    const { id } = req.params; // Get widget id from the request params
    const { domain, type, position, label, link, color, size, shape, isActive, onlyIcon, name } = req.body;
    try {
        // Find the widget by id
        const widget = await Widget.findById(id);

        if (!widget) {
            return res.status(404).json({ message: "Widget not found", isSuccess: false });
        }

        // Ensure the widget belongs to the current user (optional check)
        if (widget.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to edit this widget", isSuccess: false });
        }

        // Update the widget fields
        widget.domain = domain || widget.domain;
        widget.type = type || widget.type;
        widget.position = position || widget.position;
        widget.label = label || widget.label;
        widget.link = link || widget.link;
        widget.color = color || widget.color;
        widget.size = size || widget.size;
        widget.shape = shape || widget.shape;
        widget.isActive = isActive;
        widget.onlyIcon = onlyIcon,
            widget.name = name || widget.name;

        // Save the updated widget
        await widget.save();

        return res.status(200).json({ message: "Widget updated successfully", data: widget, isSuccess: true });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message, isSuccess: false });
    }
};

export const getWidgets = async (req, res) => {
    const active = req.query.active || false;
    const query = { user: req.user.id }
    if (active) {
        query.isActive = true
    }
    try {
        const widgets = await Widget.find(query);
        res.status(200).json({ data: widgets, message: "Retrived successfully", isSuccess: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const deleteWidget = async (req, res) => {
    const { id } = req.params; // Get widget ID from request params
    try {
        const widget = await Widget.findById(id);

        if (!widget) {
            return res.status(404).json({ message: "Widget not found", isSuccess: false });
        }

        // Check if the widget belongs to the authenticated user
        if (widget.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this widget", isSuccess: false });
        }

        await Widget.findByIdAndDelete(id);
        res.status(200).json({ message: "Widget deleted successfully", isSuccess: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const getWidget = async (req, res) => {
    const { id } = req.params;
    const { domain } = req.query;
    const currDomain = getDomainName(domain || "");
    const whiteListDomain = [process.env.FRONTEND_DOMAIN];
    console.log("whiteListDomain", whiteListDomain, currDomain)
    try {
        const widget = await Widget.findById(id);
        if (!widget || (!widget.domain.includes(currDomain) && !whiteListDomain.includes(currDomain))) {
            return res.status(404).json({ message: "Widget not found", isSuccess: false });
        }
        res.status(200).json({ data: widget, message: "Retrieved successfully", isSuccess: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}