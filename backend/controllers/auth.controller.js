// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from "dotenv";
// Secret for JWT
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const oneDay = 24 * 60 * 60 * 1000;
// User Registration
export async function register(req, res) {
  const { name, role, organizationName, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // encrypting the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      name,
      role,
      organizationName,
      email,
      password: hashedPassword,
    },
  });
  return res.status(201).json({ message: "Signup successful", newUser });
}
export async function login(req, res) {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: oneDay }
  );

  // Set JWT token in an HTTP-only, Secure cookie
  res.cookie("authToken", token, {
    httpOnly: true, // Prevent access to the cookie via JavaScript
    secure: true, // sent over https
    maxAge: oneDay, // Token expiration (1 hour)
    sameSite: "Strict", // Protect against CSRF attacks
  });
  return res.status(200).json({ 
    message: "Login successful",
    userData: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      organizationName: user.organizationName
    }
  });}

export async function user(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// this route will clear the cookie when using logout route
export function logout(req, res) {
  res.clearCookie("authToken", { httpOnly: true, sameSite: "Strict" });
  res.status(200).json({ message: "Logout succesful" });
}

export async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User Data fetched successfully",
      role: user.role,
    });
  } catch (error) {
      return res.status(500).json({
        message: "Error fetching user data"
      })
  }
}
