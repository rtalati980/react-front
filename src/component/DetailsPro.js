import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { add as addToCart } from "../component/Slices/CartSlice"; // Rename add import to avoid conflict
import { useSnackbar } from "notistack";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './detailspr.module.css';
import API_BASE_URL from '../config';

const DetailsPro = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedCarat, setSelectedCarat] = useState(3.25);
    const [fluctuatedPrice, setFluctuatedPrice] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/product/api/id/${id}`, {
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
        if (carat !== 3.25) {
            const newPrice = (product.price + (carat - 3.25) * 300) * count;
            setFluctuatedPrice(newPrice);
        } else {
            setFluctuatedPrice(product.price * count);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await fetchData();
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setMainImage(fetchedProduct.images[0]);
                setFluctuatedPrice(fetchedProduct.price * count); // Initial price is for 3.25 carat
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        if (product) {
            if (selectedCarat !== 3.25) {
                const newPrice = (product.price + (selectedCarat - 3.25) * 300) * count;
                setFluctuatedPrice(newPrice);
            } else {
                setFluctuatedPrice(product.price * count);
            }
        }
    }, [selectedCarat, count, product]);

    const addToCartHandler = () => {
        const itemToAdd = { ...product, selectedCarat, quantity: count };
        dispatch(addToCart(itemToAdd));
        enqueueSnackbar(`Item added to your cart successfully`, {
            variant: "success",
            autoHideDuration: 3000,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles['product-container']}>
                <div className={styles.left}>
                    {mainImage && (
                        <img
                            src={mainImage}
                            alt="Main Product"
                            className={`${styles['img-fluid']} ${styles['main-image']}`}
                        />
                    )}
                    <div className={styles['thumbnail-container']}>
                        {product && product.images && product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={styles.thumbnail}
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    {product && (
                        <>
                            <h1>{product.name}</h1>
                            <h2>Rs. {fluctuatedPrice !== null ? fluctuatedPrice : product.price * count}</h2>
                            {(product.category).name === 'Gemstone' && (
                                <div className={`${styles.gemc} mb-3`}>
                                    {[3.25, 4.25, 5.25, 6.25, 7.25, 8.25, 9.25, 10.25].map((carat) => (
                                        <button
                                            key={carat}
                                            className={`btn crt-btn me-2 ${selectedCarat === carat ? styles.active : ''}`}
                                            onClick={() => handleCaratChange(carat)}
                                        >
                                            {carat} Carat
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className={`align-items-center mb-3 ${styles.faincrement}`}>
                                <FaPlus onClick={handleIncrement} className="me-2" />
                                <p className="m-0">{count}</p>
                                <FaMinus onClick={handleDecrement} className="ms-2 " />
                            </div>
                            <div className={styles.btnrt}>
                                <button onClick={addToCartHandler}>Add to Cart</button>
                                <Link to={`/checkout?totalPrice=${fluctuatedPrice || product.price * count}&totalQuantity=${count}&productNames=${product.name}&productQuantities=${count}&carat=${selectedCarat}`}>
                                    <button>Buy Now</button>
                                </Link>
                            </div>
                            <div className={styles.description}>
                                <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPro;
