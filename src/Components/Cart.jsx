import React, { useContext, useEffect, useState } from "react";
import '../Assets/Cart.css';
import { itemContext } from "./ItemContext";
import { userContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";

const Cart = () => {
    const cartContextData = useContext(itemContext);
    const logDetails = useContext(userContext);
    const navigation = useNavigate();
    const [foodId, setFoodId] = useState();

    useEffect(() => {
        let cartData = JSON.parse(localStorage.getItem('TotalCart')) || [];
        var id = logDetails.loggedInUser ? logDetails.loggedInUser.id : -1;
        console.log('cartData', cartData, id);

        console.log('cartContextData.cart', cartContextData.cart);
        console.log('cartData[id]', cartData[id]);
        cartContextData.setCart(cartData[id] ?? []);
    }, [])

    const totalPrice = () => {
        return cartContextData.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total  + price * item.count ;
        }, 0);
    };

    const placeOrderFunction = () => {
        let mathId = Number(Math.random());
        if (!logDetails.loggedInUser) {
            alert('Sign in first to place the order');
            navigation('/login');
            return;
        }

        const userId = logDetails.loggedInUser.id;
        const currentCart = cartContextData.cart || [];

        if (currentCart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const orderHistory = JSON.parse(localStorage.getItem('OrderHistory')) || {};
        const userOrders = orderHistory[userId] || [];


        userOrders.push({
            date: new Date(),
            time: new Date().getTime(),
            items: currentCart,
            orderId: mathId,
            totalPrice: currentCart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace('$', '')) || 0;
                setFoodId(mathId);
                return sum + price * (item.count || 1);
            }, 0),
        });

        orderHistory[userId] = userOrders;
        console.log('orderHistory[userId]', orderHistory[userId]);
        let id = mathId;
        localStorage.setItem('OrderHistory', JSON.stringify(orderHistory));

        const cartItems = orderHistory[userId].filter(item => item.orderId === id);
        console.log('cartItems', cartItems);
        localStorage.setItem('Cart', JSON.stringify(cartItems));

        cartContextData.setCart([]);
        localStorage.removeItem('TotalCart');
        navigation('/Payment');
    }


    const updateCount = (index, change) => {
        const updated = [...cartContextData.cart];
        const updatedItem = updated[index];

        updatedItem.count += change;

        if (updatedItem.count < 1) {
            updated.splice(index, 1);
        } else {
            updated[index] = updatedItem;
        }

        cartContextData.setCart(updated);

        const userId = logDetails.loggedInUser ? logDetails.loggedInUser.id : -1;
        const cartData = JSON.parse(localStorage.getItem('TotalCart')) || {};
        cartData[userId] = updated;
        localStorage.setItem('TotalCart', JSON.stringify(cartData));
    };

    return (
        <div className='cart'>
            <div className='cart-header'>Invoice</div>
            <div className="food">
                {
                    cartContextData.cart.map((food, index) => (
                        <div className='cart-food' key={index}>
                            <div className="cartImage">
                                <img className='cart-image' src={food.image} alt={food.name} />
                            </div>
                            <div className="food-details">
                                <div>
                                    <h>{food.name}</h>
                                    <h>{food.price} </h>
                                </div>
                            </div>
                            <div className="count">
                                <button onClick={() => updateCount(index, -1)}>-</button>
                                <span>{food.count}</span>
                                <button onClick={() => updateCount(index, 1)}>+</button>
                            </div>
                        </div>
                    ))
                }
                <div>
                    <p className="total-price">Total To pay: ${totalPrice()}</p>
                    {/* <Payment data={totalCost} /> */}
                </div>
            </div>
            <div className="cartButton">
                <button className="orderButton" onClick={placeOrderFunction}>Place An Order Now</button>
            </div>
        </div>
    );
};

export default Cart;
