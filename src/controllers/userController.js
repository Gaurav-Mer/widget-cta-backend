import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Function to generate JWT
const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set the token as an HTTP-only cookie
    res.cookie("jwt", token, {
        httpOnly: true, // Prevents access from JavaScript
        secure: false, // Set to true in production
        sameSite: "Strict", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: false
    });
};

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

//getting user info
export const userInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming `id` is stored in the token payload
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const data = await res.json(user);
        return res.status({
            message: "User data retrive successfully!", user: { id: data._id, name: data.name, email: data.email },
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
// User Registration
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        generateToken(res, user._id);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log("user", user)
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateToken(res, user._id);

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User Logout (Clear Cookie)
export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
};
