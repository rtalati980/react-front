import React, { useState, useEffect } from 'react';
import './detailspr.css';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsPro = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedCarat, setSelectedCarat] = useState(null);
    const [fluctuatedPrice, setFluctuatedPrice] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/id/${id}`, {
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
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleCaratChange = (carat) => {
        setSelectedCarat(carat);

        // Calculate the fluctuated price based on the selected carat and count
        const newPrice = (product.price + carat * 300) * count; // Adjusted based on count
        setFluctuatedPrice(newPrice);
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

    useEffect(() => {
        // Recalculate the fluctuated price whenever the selected carat changes
        if (selectedCarat !== null) {
            const newPrice = (product.price + selectedCarat * 300) * count;
            setFluctuatedPrice(newPrice);
        }
    }, [selectedCarat, count, product]);

    const getFileName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-12 mb-4">
                    {product && product.images && product.images[0] && (
                        <img
                            src={`${product.images[0]}`}
                            alt={`${product.images[0]}`}
                            className="img-fluid"
                        />
                    )}
                </div>
                <div className="col-lg-6 col-12">
                    {product && (
                        <>
                            <h1>{product.name}</h1>
                            <h2>Rs. {fluctuatedPrice !== null ? fluctuatedPrice : product.price * count}</h2>
                            {(product.category).name === 'Gemstone' && (
                                <div className='gemc mb-3'>
                                    {/* Display carat selection buttons only if the product category is "gemstone" */}
                                    <button className="btn btn-outline-primary me-2" onClick={() => handleCaratChange(1)}>6.5 Carat</button>
                                    <button className="btn btn-outline-primary me-2" onClick={() => handleCaratChange(2)}>7.5 Carat</button>
                                    <button className="btn btn-outline-primary me-2" onClick={() => handleCaratChange(3)}>8.5 Carat</button>
                                    <button className="btn btn-outline-primary me-2" onClick={() => handleCaratChange(4)}>9.5 Carat</button>
                                    <button className="btn btn-outline-primary me-2" onClick={() => handleCaratChange(5)}>10.5 Carat</button>
                                </div>
                            )}
                            <div className='d-flex align-items-center mb-3'>
                                <FaPlus onClick={handleIncrement} className="me-2" />
                                <p className="m-0">{count}</p>
                                <FaMinus onClick={handleDecrement} className="ms-2" />
                            </div>
                            <Link to={'/cart'} className="btn btn-primary me-2">Add To Cart</Link>
                            <button className="btn btn-secondary">Buy Now</button>
                            <p className="mt-3">{product.description}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPro;
