import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import '@splidejs/react-splide/css';
import Slider from "../css/slider.css";

export default function Home() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const apiKey = ''//Enter your google API here

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&key=${apiKey}`); // Replace with your API endpoint
            console.log(response)
            setData(response.data);
            setIsLoading(false);
          } catch (error )
          {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          }
        }
      
        fetchData();
      }, []);


    return (
        <Fragment>
            
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <div>
                        <h2>Top Trending Books</h2>
                        <Slider data = {data}/>
                    </div>
                ) : (
                    <p>Error fetching data</p>
                )}
            </div>
        </Fragment>
    )
}