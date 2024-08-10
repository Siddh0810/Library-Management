import './App.css';
import React from 'react';
// import MyNavbar from './components/files/Navbar'
import MyNavbar from './components/files/Navbar';
import Book from './components/files/book_page';


function App() {
  // Fetch books data here

  return (
    <div className="App">
       <MyNavbar/>
       {/* <Book/> */}
    </div> 
  );
}


export default App;

