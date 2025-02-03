import Widget from "../models/Widget.js";
import jwt from "jsonwebtoken";

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
    const { name, type, position, label, link, color, size, shape } = req.body;
    try {
        const widget = new Widget({ user: req.user.id, name, type, position, link, color, label, size, shape });
        await widget.save();
        // res.status(201).json(widget);
        res.status(201).json({ message: "Widget created successfully", data: widget, isSuccess: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const editWidget = async (req, res) => {
    const { id } = req.params; // Get widget id from the request params
    console.log("id", id)
    const { name, type, position, label, link, color, size, shape } = req.body;

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
        widget.name = name || widget.name;
        widget.type = type || widget.type;
        widget.position = position || widget.position;
        widget.label = label || widget.label;
        widget.link = link || widget.link;
        widget.color = color || widget.color;
        widget.size = size || widget.size;
        widget.shape = shape || widget.shape;

        // Save the updated widget
        await widget.save();

        return res.status(200).json({ message: "Widget updated successfully", data: widget, isSuccess: true });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message, isSuccess: false });
    }
};

export const getWidgets = async (req, res) => {
    try {
        const widgets = await Widget.find({ user: req.user.id });
        res.status(200).json({ data: widgets, message: "Retrived successfully", isSuccess: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


