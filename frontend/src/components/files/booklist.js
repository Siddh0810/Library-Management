// booklist.js (renamed from book_list.js for consistency)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../css/BookList.css'; // Create a separate CSS file for styling

export default function BookList(props) {
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books from Google Books API
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=40&key=AIzaSyCRBkgp9DwrAfNmYKXqQUI01RndS6fPfQM`
            )
            .then((response) => {
                setBooks(response.data.items);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div className="book-list">
            {books.map((book, index) => (
                <div className="book-card" key={index}>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                    <h2>{book.volumeInfo.title}</h2>
                    <Link to={`/book/${index}`}>View Details</Link> {/* Add Link with dynamic URL */}
                </div>
            ))}
        </div>
    );
}
