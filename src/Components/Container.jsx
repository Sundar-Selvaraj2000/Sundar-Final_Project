import React, { createContext, useContext, useEffect, useState } from "react";
import '../Assets/Container.css'
import { userContext } from "./LoginContext";
import { itemContext } from "./ItemContext";
import vegBurger from '../Assets/vegburger.webp';
import vanilaPic from '../Assets/vanila.webp';
import chickenRoll from '../Assets/chickenroll.jpg';
import turkeyBurger from '../Assets/turkeyburger.jpeg';
import MeatBurger from '../Assets/meatBurger.jpeg';
import BeefBurger from '../Assets/beefBurger.jpeg';
import chesseBurger from '../Assets/cheeseBurger.jpeg';
import mushroomBurger from '../Assets/mushroomBurger.jpeg';
import chickenBurger from '../Assets/chickenBurger.jpeg';
import Sandwich from '../Assets/Sandwiches.jpeg';
import donut from '../Assets/donet.jpeg';
import hotDog from '../Assets/hotDog.jpeg';
import { getTimeDiffFromGivenDate } from "../helpers/commonfunctions";


const Container = () => {

    // const foods = [{ name: 'vegetable Burger', price: '$20', image: vegBurger, category: 'Burger' }, { name: 'Sandwich', price: '$20', image: Sandwich, category: 'Sandwich' }, { name: 'Hot Dog', price: '$20', image: hotDog, category: 'hotDog' }, { name: 'Donut', price: '$20', image: donut, category: 'Donuts' }, { name: "Vanilla", price: "$5", image: vanilaPic, category: 'Ice' }, { name: 'Chicken Rolls', price: '$20', image: chickenRoll, category: 'Roll' }, { name: 'Turkey Burger', price: '$20', image: turkeyBurger, category: 'Burger' }, { name: 'Meat Burger', price: '$35', image: MeatBurger, category: 'Burger' }, { name: 'Chicken Burger', price: '$30', image: chickenBurger, category: 'Burger' }, { name: 'Mushroom Burger', price: '$30', image: mushroomBurger, category: 'Burger' }, { name: 'Cheese Burger', price: '$30', image: chesseBurger, category: 'Burger' }, { name: 'Beef Burger', price: '$30', image: BeefBurger, category: 'Burger' }]
    const [foods, setFoods] = useState([]);
    const [updatedFood, setUpdatedFood] = useState([...foods]);
    const [popularFoods, setPopularFoods] = useState([{ name: 'vegetable Burger', price: '$20', image: vegBurger }, { name: 'Sandwich', price: '$20', image: Sandwich, category: 'Sandwich' }, { name: 'Meat Burger', price: '$35', image: MeatBurger }, { name: 'Chicken Burger', price: '$30', image: chickenBurger }, { name: 'Mushroom Burger', price: '$30', image: mushroomBurger }, { name: 'Cheese Burger', price: '$30', image: chesseBurger }, { name: 'Beef Burger', price: '$30', image: BeefBurger }]);
    const [recentFoods, setRecentfoods] = useState([{ name: 'Chicken Rolls', price: '$20', image: chickenRoll }, { name: 'Meat Burger', price: '$35', image: MeatBurger }, { name: 'Chicken Burger', price: '$30', image: chickenBurger }, { name: "Vanilla", price: "$5", image: vanilaPic, category: 'Ice' }])
    const contextData = useContext(itemContext);
    const [foodType, setFoodType] = useState();
    const [totalCart, setTotalCart] = useState();
    const userDetails = useContext(userContext);

    useEffect(() => {
        const foodCart = JSON.parse(localStorage.getItem('foodList')) || [];
        setFoods(foodCart);
        setUpdatedFood(foodCart);
        console.log('foodcart useeffect', foodCart);
    }, [])

    useEffect(() => {
        console.log('logg in details', userDetails);
        console.log('container');
        let foodVariety = contextData.chooseItem;
        console.log('foodvariety', foodVariety);
        if (!foodVariety) {
            setUpdatedFood(foods);
        }
        else {
            const foodArray = foods.filter((food) => {
                if ((food.name.toLowerCase().includes(foodVariety.toLowerCase())) || (food.category.toLowerCase() === foodVariety.toLowerCase()))
                    return food;
            })
            setUpdatedFood(foodArray);
        }
        if (foodVariety === 'All') {
            setUpdatedFood(foods);
        }

        console.log('container', userDetails.loggedInUser)
    }, [contextData.chooseItem, contextData.searchFood, foods])

    const popularFunction = () => {
        setUpdatedFood(popularFoods)
    }

    const recentFunction = () => {
        setUpdatedFood(recentFoods)
    }

    const orderFunction = (food) => {
        var tempId = userDetails.loggedInUser ? userDetails.loggedInUser.id : -1;

        console.log('temp id', tempId);
        const currentCart = contextData.cart || [];
        const existingItems = currentCart.filter(item => item.name === food.name);

        let updatedCart = [];
        if (existingItems.length > 0) {
            updatedCart = currentCart.map(item => {
                if (item.name === food.name) {
                    return { ...item, count: (item.count || 1) + 1 };
                }
                return item;
            });
        } else {
            const foodWithCount = { ...food, count: 1 };
            updatedCart = [...currentCart, foodWithCount];
        }

        let array = JSON.parse(localStorage.getItem('TotalCart')) || {};

        const existingUserCart = array[tempId] || [];

        const cartIndex = existingUserCart.findIndex(item => item.name === food.name);
        if (cartIndex !== -1) {
            existingUserCart[cartIndex].count += 1;
        } else {
            existingUserCart.push({ ...food, count: 1 });
        }

        array[tempId] = existingUserCart;
        localStorage.setItem('TotalCart', JSON.stringify(array));
        contextData.setCart(existingUserCart);
    }

    return (
        <>
            <div className='food-item-menu'>
                <div onClick={popularFunction} >Popular</div>
                <div onClick={recentFunction}>Recent</div>
            </div>
            <div className='food-container'>
                {
                    updatedFood.map((food, i) => {
                        return (
                            <div className='container' key={i}>
                                <div className='img'>
                                    <img className='container-image' src={food.image} alt="Food Image" />
                                </div>
                                {food.name}
                                <span>{food.price}</span>
                                <div className='buttons'>
                                    <button className='button'>Wishlist</button>
                                    <button className='button' onClick={() => orderFunction(food)}>Order Now</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Container;