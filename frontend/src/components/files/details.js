/* eslint-disable react/jsx-no-undef */
// import React from 'react';
// import '../css/Navbar.css'; // Import your CSS file for styling
// import book from './book.jpg'
// import LoginForm from './LoginForm';
// import BookList from './booklist';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src={book} alt='book' className='book' />
//         <a className="navbar-button" href={BookList}>Home</a>
//         <a className="navbar-button" href="Title.html">Books</a>
//       </div>
//       <div className="navbar-right">
//         <Link className="navbar-button" to={LoginForm}>Login</Link>
//         <a className="navbar-button" href="web4.html">Signup</a>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
// import different pages here
import book from "./book.jpg";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book from "./book_page";
import Login from "./LoginForm";
import Slide from "./BookSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar"; // Import Navbar from react-bootstrap
import Container from "react-bootstrap/Container"; // Import Container from react-bootstrap
import Nav from "react-bootstrap/Nav";

export default function Navb() {
  const signedIn = localStorage.getItem("user");
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={book}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Book">Books</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Router>
        <Routes>
          {console.log(signedIn)}
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Login />}></Route>
          <Route
            path="/Book"
            element={
              signedIn ? (
                <>
                  <Book />
                </>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/Home"
            element={
              signedIn ? (
                <>
                  <Slide />
                </>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="logout" element={<Logout />} />
        </Routes>
      </Router>
    </Navbar>
  );
}
