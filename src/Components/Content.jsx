import React, { useContext, useEffect, useState } from "react"
import '../Assets/Content.css';
import { userContext } from "./LoginContext";
import { itemContext } from "./ItemContext";
import { useNavigate } from "react-router-dom";

export default function Content() {

    const navbuttons = ['Food Order', 'Order History', 'Admin'];
    const userDetails = useContext(userContext);
    const cartDetails = useContext(itemContext);
    const navigation = useNavigate();



    const logoutFunction = () => {
        userDetails.setLoggedInUser();
        // cartDetails.setCart({});
        navigation('/login');
    }

    const handleNavClick = (item) => {
        switch (item) {
            case 'Order History':
                navigation('/OrderHistory');
                break;
            case 'Food Order':
                navigation('/');
                break;
            // case 'Payment':
            //     navigation('/Payment');
            //     break;
            case 'Admin':
                if (userDetails.loggedInUser && userDetails.loggedInUser.userType === "Admin") {
                    navigation('/Admin');
                } else {
                    alert('Access denied. You must be an Admin to access this page.');
                }
                break;
        }
    }

    return (
        <div className='navBar'>
            {
                navbuttons.map((item, index) => {
                    return (
                        <button onClick={() => handleNavClick(item)}
                            className='sideButtons'>{item}</button>
                    )
                })
            }
            <button className="sideButtons" onClick={logoutFunction}>Log Out</button>
        </div>
    )
}