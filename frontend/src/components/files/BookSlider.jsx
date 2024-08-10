import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { Card } from "react-bootstrap";
import '@splidejs/splide/dist/css/splide.min.css'; // Import Splide.js CSS
import '../css/slider.css'; // Import your custom slider styles

export default function Slide() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&key=AIzaSyCRBkgp9DwrAfNmYKXqQUI01RndS6fPfQM`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //       // Fetch books from Google Books API
  //       axios
  //           .get(
  //               `https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=40&key=AIzaSyCRBkgp9DwrAfNmYKXqQUI01RndS6fPfQM`
  //           )
  //           .then((response) => {
  //               setBooks(response.data.items);
  //           })
  //           .catch((error) => {
  //               console.error('Error fetching books:', error);
  //           });
  //   }, []);
  return (
    <Fragment>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : data ? (
          <div style={{marginTop:"5rem"}}>
            <h2>Top Trending Books</h2>
            <div className="row d-flex flex-wrap container mx-auto">
                {data.items.map((item) => (
                  <div className="col">
                    <Card.Body key={item.id} style={{margin:"2rem",float:"left"}}>
                    <div>
                      <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
                      <h3>{item.volumeInfo.title}</h3>
                    </div>
                    </Card.Body>
                    </div>
                ))}
            </div>
          </div>
        ) : (
          <p>Error fetching data</p>
        )}
      </div>


    </Fragment>
  );
}
