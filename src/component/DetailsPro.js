import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { add } from "../component/Slices/CartSlice";
import { useSnackbar } from "notistack";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './detailspr.module.css';

const DetailsPro = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedCarat, setSelectedCarat] = useState(null);
    const [fluctuatedPrice, setFluctuatedPrice] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

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
        const newPrice = (product.price + carat * 300) * count;
        setFluctuatedPrice(newPrice);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await fetchData();
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setMainImage(fetchedProduct.images[0]);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        if (selectedCarat !== null && product) {
            const newPrice = (product.price + selectedCarat * 300) * count;
            setFluctuatedPrice(newPrice);
        }
    }, [selectedCarat, count, product]);

    const addToCart = () => {
        dispatch(add(product));
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
                                    <button className="btn crt-btn me-2" onClick={() => handleCaratChange(1)}>6.5 Carat</button>
                                    <button className="btn crt-btn me-2" onClick={() => handleCaratChange(2)}>7.5 Carat</button>
                                    <button className="btn crt-btn  me-2" onClick={() => handleCaratChange(3)}>8.5 Carat</button>
                                    <button className="btn crt-btn me-2" onClick={() => handleCaratChange(4)}>9.5 Carat</button>
                                    <button className="btn crt-btn me-2" onClick={() => handleCaratChange(5)}>10.5 Carat</button>
                                </div>
                            )}
                            <div className='d-flex align-items-center mb-3'>
                                <FaPlus onClick={handleIncrement} className="me-2" />
                                <p className="m-0">{count}</p>
                                <FaMinus onClick={handleDecrement} className="ms-2" />
                            </div>
                            <div className='btnrt'>
                            <button   onClick={addToCart} style={{width:'30%'}}>Add to Cart</button>
                            <Link to={`/checkout?totalPrice=${product.price * count}&totalQuantity=${count}&productNames=${product.name}&productQuantities=${count}`}>
                                <button   style={{width:'30%'}}>Buy Now</button>
                            </Link></div>
                            <div className={styles.description}>
                                <p dangerouslySetInnerHTML={{ __html: product.discription }}></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPro;
