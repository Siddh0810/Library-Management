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
import book from './book.jpg'
import React from "react";
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
// import Book from "./book_page";
import Login from "./LoginForm";
import Slide from "./BookSlider";
import Register from "./register";
import BookList  from './booklist';
import BookDetail from './book_details';
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from "../logout";



// import different pages here

export default function MyNavbar(books) {
    const signedIn = localStorage.getItem("user")
    return (
        <Router>
            <div className='container-fluid'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-5-strong">
                    <a className="navbar-brand" href="#home">
                        <img src={book} alt=" " style={{ width: '2rem', height: '2rem', marginLeft: "0.5rem" }} className="rounded-pill" />
                    </a>

                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#demo">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse nav justify-content-center" id="demo">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/Book" className="nav-link">Book</Link></li>
                            
                      

                            {signedIn ? (<><li><Link to="/logout" className="nav-link">(Hello {signedIn})Logout</Link></li></>) : ( <> <li><Link to="/login" className="nav-link">Login/Sigup</Link></li> </>)}
                        </ul>
                    </div>
                </nav>
            </div>
            <Routes>
        <Route path='/' element={signedIn? <Slide />:<Login/>} />
        <Route path='Book' element={signedIn? <BookList />:<Login/>} />
        <Route path='Book/:id' element={<BookDetail books={books} />} />
        <Route path='login' element={<Login />} />
        <Route path="logout" element={<Logout />}/>
        <Route path='signup' element={<Register/>}/>
      </Routes>

        </Router>
    )
}