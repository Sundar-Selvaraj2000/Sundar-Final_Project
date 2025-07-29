import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from './LoginContext';
import '../Assets/Payment.css';


const Payment = () => {
    const logDetails = useContext(userContext);
    const [totalCost, setTotalCost] = useState(0);
    const [platformFee, setPlatformFee] = useState(5);
    const [tax, setTax] = useState(5);
    const [foodPrice, setFoodPrice] = useState(0);

    useEffect(() => {
        const userId = logDetails.loggedInUser ? logDetails.loggedInUser.id : -1;
        console.log('userId', userId);
        const cartData = JSON.parse(localStorage.getItem('Cart')) || [];
        let price = cartData[0].totalPrice;
        setFoodPrice(price);
        // console.log('price', price);
        const total = (price + tax + platformFee);
        setTotalCost(total);
    }, [])

    const nav = useNavigate();

    const productFunction = () => {
        nav('/');
    }

    const payFunction = () => {
        localStorage.removeItem('Cart');
        nav('/OrderHistory');
    }


    return (
        <div className='body'>
            <div className='block'>
                {/* <button onClick={productFunction}> product</button> */}
                <h1 className='payment'>Payment</h1>
                <p className='data'>Total Price: ${foodPrice}</p>
                <p className='data'>platform Fee : ${platformFee}</p>
                <p className='data'> GST & CGST : ${tax}</p>
                <button onClick={payFunction} className='pay'>Pay {totalCost}</button>
            </div>
        </div>
    );
};

export default Payment;
