import React, { useState } from 'react';
import { Button, Container} from "react-bootstrap";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import "../style/SignUp.css"

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/api/signup", {
          username,
          email,
          password,
        });
        alert("User signed up successfully.");
        setUsername("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("Error signing up:", error);
        alert("An error occurred.");
      }
    };

  return (
    <div>
      <div className="signIn">
        <Container className="signInModal">
          <form onSubmit={handleSubmit}>
            <h1 align="center" className="main fw-light">Sign Up</h1>
            <div className="modalText">
              <TextField variant="standard" label="Username" className="modalText" value={username} name='username' onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="modalText">
              <TextField variant="standard" label="Email" className="modalText" value={email} name='email' onChange={(e) => setEmail(e.target.value)} required />
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
              <Button variant='contained' type='submit' className='modalBtn text-white'>Sign Up with E-mail</Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">Already have an account ?
              {/* <Link to="/signin" element={</>} className="btnLink"> Sign In</Link> */}
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;