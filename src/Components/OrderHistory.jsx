import React, { useState, useEffect, useContext } from 'react';
import '../Assets/OrderHistory.css';
import { useNavigate } from 'react-router-dom';
import { userContext } from './LoginContext';
import { getTimeDiffFromGivenDate } from '../helpers/commonfunctions';
import Header from './Header';
import Content from './Content';

const OrderHistory = () => {
    const [orderData, setOrderData] = useState([]);
    const logDetails = useContext(userContext);
    const navigation = useNavigate();
    const [visibleStatus, setVisibleStatus] = useState(null);
    const [platformFee, setPlatformFee] = useState(10);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('OrderHistory')) || {};
        const userId = logDetails.loggedInUser ? logDetails.loggedInUser.id : -1;

        if (userId === -1) {
            alert('No order found');
            return;
        }
        const userOrders = cartData[userId] || [];
        setOrderData(userOrders);
    }, [logDetails.loggedInUser]);

    const handleViewStatus = (orderId) => {
        setVisibleStatus(visibleStatus === orderId ? null : orderId);
    };

    return (
        <div className='homePage'>
            <Header />
            <div className='homePage-content'>
                <Content />
                <div className="order-progress">
                    <table>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Order Id</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((order, index) => (
                                <tr key={index}>
                                    <td>
                                        {order.items.map((item, itemIndex) => (
                                            <div key={itemIndex}>{item.name} (Qty: {item.count})</div>
                                        ))}
                                    </td>
                                    <td>{order.orderId}</td>
                                    <td>${order.totalPrice + 10}</td>
                                    <td>
                                        <button className='statusContent' onClick={() => handleViewStatus(order.orderId)}>View Status</button>
                                        {visibleStatus === order.orderId && (
                                            <div>
                                                <div className={getTimeDiffFromGivenDate(order.time) > 0 ? 'completed' : 'pending'}>
                                                    Order Placed
                                                </div>
                                                <div className={getTimeDiffFromGivenDate(order.time) > 5 ? 'completed' : 'pending'}>
                                                    Order Accepted
                                                </div>
                                                <div className={getTimeDiffFromGivenDate(order.time) > 10 ? 'completed' : 'pending'}>
                                                    Order In Transit
                                                </div>
                                                <div className={getTimeDiffFromGivenDate(order.time) > 15 ? 'completed' : 'pending'}>
                                                    Order Delivered
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
