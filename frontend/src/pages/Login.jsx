// src/pages/Login.jsx
import React, { useState } from "react";
import { Button, Label, Card, Input } from "../components/ui";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authSerivce";
const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      console.log("Data from login", data)
      if (data && data.message === "Login successful") {
        const { role } = data.userData;
        console.log("Role", data.userData)
        if (role === "user") {
          navigate("/");
        } else if (role === "admin") {
          navigate("/");
        }
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <p className="text-sm  mb-4 text-center text-slate-500">
          Explore wide range of courses
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email: </Label>
            <Input
              placeholder="Enter Your Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password: </Label>
            <Input
              placeholder="Enter Your Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}{" "}
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
