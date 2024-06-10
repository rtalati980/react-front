import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');

    return (
        <div>
            <h1>Thank You!</h1>
            <p>Your order has been successfully placed.</p>
            {orderId && <p>Order ID: {orderId}</p>}
        </div>
    );
};

export default ThankYouPage;
