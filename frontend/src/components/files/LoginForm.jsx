import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import "../css/Signup.css"
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // State for storing email

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      alert("Login successful.");
        // Store the email from the API response
      setPassword("");
      setEmail(""); 
      localStorage.setItem("user",response.data.user)
      localStorage.setItem("email",response.data.email)
      window.location.href = "/"; 
    } 
    catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed.");
    }
  };

  return (
    <div>
      <div className="signIn">
        <Container className="signInModal">
          <form onSubmit={handleSubmit}>
            <h1 align="center" className="main fw-light">Login</h1>
            <div className="modalText">
              <TextField variant="standard" label="Email" className="modalText" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="modalText">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={password}
                name='password' onChange={(e) => setPassword(e.target.value)} className="modalText" required />
            </div>
            <div className="modalText">
              <Button variant='contained' type='submit' className='modalBtn text-white'>Login</Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">Already have an account ?  <Link to="/signup">Signup</Link>
            </div>
           
          </form>
          
        </Container>
      </div>
    </div>
  );
}

export default Login;