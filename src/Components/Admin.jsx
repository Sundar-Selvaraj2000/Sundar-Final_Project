import React, { useState, useEffect } from 'react';
import '../Assets/Admin.css';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const [foods, setFoods] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        const foodData = JSON.parse(localStorage.getItem('foodList')) || [];
        setFoods(foodData);
    }, []);


    const menuFunction = () => {
        navigation('/');
    }

    const addFunction = () => {
        if (!foodName || !price || !image || !foodCategory) {
            alert('Please fill in all fields.');
            return;
        }

        const newCart = {
            name: foodName,
            price: price,
            image: image,
            category: foodCategory
        };
        console.log('newCart', newCart);

        let updatedCart;
        if (editIndex != null) {
            updatedCart = [...foods];
            updatedCart.splice(editIndex, 1, newCart);
            setFoods(updatedCart);
            localStorage.setItem('foodList', JSON.stringify(updatedCart));
            setEditIndex(null);
        }


        else {
            foods.push(newCart);
            localStorage.setItem('foodList', JSON.stringify(foods));
        }


        setFoodName('');
        setPrice('');
        setImage('');
        setFoodCategory('');
    };

    const editFunction = (index) => {
        console.log('foods', foods)
        const foodToEdit = foods[index];
        setFoodName(foodToEdit.name);
        setPrice(foodToEdit.price);
        setImage(foodToEdit.image);
        setFoodCategory(foodToEdit.category);
        setEditIndex(index);
        console.log('index', index);
    };

    const deleteFunction = (index) => {
        const updatedFoods = [...foods];
        updatedFoods.splice(index, 1);
        setFoods(updatedFoods);
        localStorage.setItem('foodList', JSON.stringify(updatedFoods));
    }

    return (
        <div className="admin-container">
            <h1>Admin Food Item Management</h1>
            <div className="input-group">
                <input type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)} />
                <input type="text"
                    placeholder="Price (e.g. 20)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <input type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
                <input type="text"
                    placeholder="Category (e.g. Burger, Ice)"
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)} />

                <button className="add-button" onClick={addFunction}>
                    {editIndex !== null ? "Update Food" : "Add Food"}
                </button>
                <button className='add-button' onClick={menuFunction}>Main Menu</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food, index) => (
                            <tr key={index}>
                                <td>{food.name}</td>
                                <td>{food.price}</td>
                                <td><img className='container-image' src={food.image} alt="Food Image" /></td>
                                <td>{food.category}</td>
                                <td>
                                    <button onClick={() => editFunction(index)}>Edit</button>
                                    <button onClick={() => deleteFunction(index)}>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
