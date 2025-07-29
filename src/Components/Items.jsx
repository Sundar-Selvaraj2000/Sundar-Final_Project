import React, { createContext, useContext, useState } from "react";
import '../Assets/Items.css';
import { itemContext } from "./ItemContext";



export default function Items() {
    const [categories, setCategories] = useState(['All', 'Donuts', 'Burger', 'Ice', 'Fries', 'Pizza', 'Hot Dog', 'chicken', 'Sandwich', 'Rolls']);
    const contextItem = useContext(itemContext);

    const selectFunction = (item) => {
        contextItem.setChooseItem(item);
    }
    return (
        <div className='items'>
            {
                categories.map((item, ind) => {
                    return (
                        <div className='categories' onClick={() => selectFunction(item)} key={ind}>{item}</div>
                    )
                })
            }
        </div>
    )
}