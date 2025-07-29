// import { useContext, useEffect, useState } from "react";
// import { getTimeDiffFromGivenDate } from "../helpers/commonfunctions";
// import { userContext } from "./LoginContext";

// const StatusFuction = () => {

//     const [orderData, setOrderData] = useState([]);
//     const logDetails = useContext(userContext);


//     useEffect(() => {
//         const cartData = JSON.parse(localStorage.getItem('OrderHistory')) || {};
//         console.log('cartData', cartData);
//         const userId = logDetails.loggedInUser ? logDetails.loggedInUser.id : -1;

//         if (userId === -1) {
//             alert('No order found');
//             // navigation('/');
//             return;
//         }
//         const userOrders = cartData[userId] || [];
//         setOrderData(userOrders);
//     }, [])


//     return (
//         <div>
//             {
//                 orderData.map((order, index) => (

//             <div className={getTimeDiffFromGivenDate(order.time) > 0 ? 'completed' : 'pending'} key={index}>Order Placed</div>
//             <div className={getTimeDiffFromGivenDate(order.time) > 5 ? 'completed' : 'pending'}>Order Accepted</div>
//             <div className={getTimeDiffFromGivenDate(order.time) > 10 ? 'completed' : 'pending'}>Order In Transit</div>
//             <div className={getTimeDiffFromGivenDate(order.time) > 15 ? 'completed' : 'pending'}> Order Delivered</div>
//                 ))}
//         </div >
//     )
// };

// export default StatusFuction;

import { useContext, useEffect, useState } from "react";
import { getTimeDiffFromGivenDate } from "../helpers/commonfunctions";
import { userContext } from "./LoginContext";

const StatusFunction = () => {
    const [orderData, setOrderData] = useState([]);
    const logDetails = useContext(userContext);

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

    return (
        <div className="">
            <div>
                {orderData.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orderData.map((order, index) => (

                        <div key={index}>
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
                    ))
                )}
            </div>
        </div>
    );
};

export default StatusFunction;
