import React, { useContext, useState } from "react"
import '../Assets/Header.css'
import { itemContext  } from "./ItemContext";
import { useNavigate } from "react-router-dom";
import { userContext } from "./LoginContext";

export default function Header() {


    const searchContext = useContext(itemContext);

    const [foodSearch, setFoodSearch] = useState();

    const loginContext = useContext(userContext);

    const navigation = useNavigate();

    const changeFunction = (e) =>{
        setFoodSearch(e.target.value)
    }
    const loginFunction = () =>{
        navigation('Login')
    }

    const searchFunction = () =>{
        searchContext.setChooseItem(foodSearch);
    }

    return (
        <div className="header">
            <p className='appName'>MunchMate</p>
            <input type="text" className='search' placeholder='Search Food' onChange={changeFunction}/>
            <button className='filterButton' onClick={searchFunction}>Filter</button>
            <div className='header login' onClick={loginFunction}>{loginContext.loggedInUser ? loginContext.loggedInUser.name : 'Login'}</div>
        </div>
    )
}