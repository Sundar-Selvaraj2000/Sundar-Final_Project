
import React, { useState } from 'react';
import Header from './Header';
import '../Assets/Home.css';
import img from '../Assets/donuts.webp';
import img2 from '../Assets/chickenroll.jpg';
import Content from './Content';
import Items from './Items';
import Container from './Container';
import Cart from './Cart';
import { itemContext } from './ItemContext';
import vegBurger from '../Assets/vegburger.webp';
import Category from './Category';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';

export default function Home() {

    const [navbuttons, setNavButtons] = useState(['DashBoard', 'Food Order', 'Feedback', 'Message', 'Order History', ' Details', 'Customization']);
    const [categories, setCategories] = useState(['Donuts', 'Burger', 'Ice', 'Potato', 'Fuchka', 'Pizza', 'Hot Dog', 'chicken', ' Sandwich', 'Rolls'])
    const [cart, setCart] = useState([])
    const [chooseItem, setChooseItem] = useState();
    const [searchFood, setSearchFood] = useState();

    return (
        <itemContext.Provider value={{ cart, setCart, chooseItem, setChooseItem, searchFood, setSearchFood }}>
            <div className='homePage'>
                <Header />
                <div className='homePage-content'>
                    <Content />
                    <Routes>
                        <Route path='/' element={<Category />} />
                        {/* <Route path='/' element={<OrderHistory />} /> */}
                    </Routes>
                </div>
            </div >
        </itemContext.Provider>
    )
}