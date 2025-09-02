// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  Button,
  Label,
  Card,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authSerivce";

const Signup = () => {
  const [name, setName] = useState(""); 
  const [role, setRole] = useState("user"); // State to track the selected role
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.signup(name, organizationName, email, password, role);

      if (data.newUser && data.message === "Signup successful") {
        navigate("/login");
      }
    } catch (error) {
      setError("Some Error Occurred", error);
    }
    console.log("Singning up with", name, organizationName, email, password, role);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            placeholder="Enter Your Full Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2"
          />
          </div>

          <div className="mb-4">
            <Label htmlFor="organization">Organization Name</Label>
            <Input
              placeholder="Enter Your Organization"
              id="organization"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
              className="mt-2"
          />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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

          <div className="mb-6">
            <Label>Role</Label>
            <RadioGroup
              value={role}
              onValueChange={setRole} // Set role when selected
              className="flex space-x-4 mt-2" // Display radio buttons side by side
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="text-red-500 pt-2">{error}</div>
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
