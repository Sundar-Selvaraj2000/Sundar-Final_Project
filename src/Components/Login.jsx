import React, { createContext, useContext, useEffect, useState } from "react";
import '../Assets/Login.css';
import bgImage from '../Assets/login.png'
import { userContext } from "./LoginContext";
import { useNavigate, useNavigation } from "react-router-dom";

export const dataContext = createContext();

const Login = () => {
    const details = useContext(userContext);
    const navigation = useNavigate();
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        console.log('login details', details.userDetails)
        setUserData(details.userDetails ?? []);
    })

    const productPage = () => {
        navigation('/');
    }
    const loginFunction = () => {
        var cartIndex = userData.findIndex(x => (x.email).toLowerCase() === (mail.toLowerCase()));

        if ((cartIndex != -1) && ((userData[cartIndex].password) === password)) {
            const loggedUserData = userData[cartIndex];
            details.setLoggedInUser(loggedUserData);
            // console.log('login login', loggedUserData);

            let cartArray = JSON.parse(localStorage.getItem('TotalCart')) || {};
            // const guestCart = cartArray[-1] || [];

            const data = cartArray[-1] || [];
            const userId = loggedUserData.id;

            // console.log('loggggg', data);
            const userCart = cartArray[userId] || [];

            data.forEach(guestItem => {
                const index = userCart.findIndex(item => item.name === guestItem.name);
                if (index !== -1) {
                    userCart[index].count += guestItem.count;
                } else {
                    userCart.push(guestItem);
                }
            });
            cartArray[userId] = userCart;
            delete cartArray[-1];
            localStorage.setItem('TotalCart', JSON.stringify(cartArray));

            console.log('Merged cart:', cartArray);
            // if ((userData[cartIndex].userType == "Admin")) {
            //     console.log('admin');
            //     navigation('/Admin');
            // }
            // else {
            // navigation('/')
            // }
            navigation('/')

        }
        else if (cartIndex === -1) {
            alert("User Not found")
        }

        else {
            alert("Invalid Credentials")
        }
    }

    const mailFunction = (m) => {
        setMail(m.target.value)
    }

    const registerFunction = () => {
        navigation('/Registration')
    }

    const passwordFunction = (n) => {
        setPassword(n.target.value)
    }

    return (
        <div className="login-page">
            <div className="page">
                <div className="left-page">
                    <div className="welcome">
                        <h1 className="h1">Welcome Back !</h1>
                        <p className="welcome-p">Enter to order the delicious foods2...</p>
                    </div>
                    <div className="details">
                        <h1 className="h1">Email</h1>
                        <input className="input" placeholder="Enter your mail address" onChange={mailFunction} type="text" />
                        <h1 className="h1">Password</h1>
                        <input className="input" placeholder="Enter your password" onChange={passwordFunction} type="password" />
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" />
                        <h5 className="h5" > Remember me</h5>
                        <h6 className="h6">Forgot your password?</h6>
                    </div>
                    <div>
                        <button className="LogInButton" onClick={loginFunction}>Log In</button>
                    </div>
                    <div className="signUp">
                        Don't have an account?
                        <span className="span" onClick={registerFunction} style={{ color: 'blue' }}>Register here</span>
                    </div>
                    {/* <button onClick={productPage}>products</button> */}
                </div>
                <div className="right-page">
                </div>
            </div>
        </div>
    )
};
export default Login;