import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BookDetails.css'; // Import CSS for styling

export default function BookDetail({ books }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    // Ensure that books is not empty and id is a valid index
    if (books && books.length > id) {
      setBook(books[id]);
    }
  }, [books, id]);

  const borrowBook = async () => {
    try {
      console.log("in borrowBook func")
      const currentDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(currentDate.getDate() + 14);

      // const data = {
      //   title: book.title,
      //   author: book.author,
      //   borrowedDate: currentDate,
      //   returnDate: dueDate,
      // };
      const authorString = book.volumeInfo.authors?.join(', ');
      // Send a POST request to your server to store the data in MongoDB
      const email = localStorage.getItem("email_user")
      console.log(email)
      const response = await axios.post('http://localhost:5000/api/borrow',{
        title: book.volumeInfo.title,
        author: authorString,
        borrowedDate: currentDate,
        returnDate: dueDate,
        email : email,
      });

      if (response.status === 200) {
        setIsBorrowed(true);
        alert('Book borrowed successfully!');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <div className="book-image">
        <img className='bookimage' src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
      </div>
      <div className="book-info">
        <h1 className='book-title'>{book.volumeInfo.title}</h1>
        <p className='book-author'><strong>Author:</strong> {book.volumeInfo.authors?.join(', ')}</p>
        <p className='book-publisher'><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
        <h2>About Book:</h2>
        <p className='book-description'>{book.volumeInfo.description || 'No description available.'}</p>
      {isBorrowed ? (
        <p style={{color:"red"}}>Book is already Borowwed!!</p>
      ) : (
        <button onClick={borrowBook}>Borrow</button>
      )}
      </div>
    </div>
  );
}
