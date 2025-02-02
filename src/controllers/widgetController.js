import Widget from "../models/Widget.js";

export const createWidget = async (req, res) => {
    const { name, type, position, script } = req.body;

    try {
        const widget = new Widget({ user: req.user.id, name, type, position, script });
        await widget.save();
        res.status(201).json(widget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getWidgets = async (req, res) => {
    try {
        const widgets = await Widget.find({ user: req.user.id });
        res.json(widgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
