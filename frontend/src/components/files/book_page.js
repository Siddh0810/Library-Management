import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetail from './book_details';
import BookList from "./booklist";
import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';


export default function Book(){
    const [books, setBooks] = useState([]);

    useEffect(() => {
      // Fetch books from Google Books API
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=16&key=AIzaSyCRBkgp9DwrAfNmYKXqQUI01RndS6fPfQM`
        )
        .then((response) => {
          setBooks(response.data.items);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }, []);
    return(
        <Router>
        <Routes>
          <Route path="/" element={<BookList books={books} />} />
          <Route path="/book/:id" element={<BookDetail books={books} />} />
        </Routes>
      </Router>
    )
}