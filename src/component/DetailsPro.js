import React, { useState, useEffect } from 'react';
import './detailspr.css'
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";

const DetailsPro = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(0);
    const [selectedCarat, setSelectedCarat] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://radhakrishnamart.azurewebsites.net/product/api/id/${id}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleCaratChange = (carat) => {
        setSelectedCarat(carat);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await fetchData();
            if (fetchedProduct) {
                setProduct(fetchedProduct);
            }
        };

        fetchProduct();
    }, []);

    const getFileName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
      };

    return (
        <div className="product-container">
            <div className="left">
           
            </div>
            <div className="right">
                {product && (
                    <>
                        <h1>{product.name}</h1>
                        <h2>Rs.{product.price * (selectedCarat || 1)}.00</h2>
                        <p>{product.description}</p>
                        <p>There are no hidden charges</p>
                        <div className='cl'>
                            <FaPlus onClick={handleIncrement} />
                            <p>{count}</p>
                            <FaMinus onClick={handleDecrement} />
                        </div>
                        <button>Add To Cart</button>
                        <button>Buy Now</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailsPro;