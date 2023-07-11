import React, { useRef, useState } from "react";
import "../styles/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Signin = ()=>{
    const formRef = useRef();
    const navigate = useNavigate();

    const signinHandler = ()=>{
        signInWithPopup(auth,provider).then(data => {
             // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(data);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = data.user;
            navigate("/home");
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
                })
            
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        const  email = formRef.current.email.value;
        const password = formRef.current.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

    };
    return(
        <div className="register-cont">
            <div className="sidebar">
                <h1>Board.</h1>
            </div>
           
            <div className="form-cont">
                <div className="header">
                <h1>Sign in</h1>
                <p>Sign in to your account</p>
                </div>
                <div className="google-btn" onClick={signinHandler}><img src="https://cdn-icons-png.flaticon.com/128/281/281764.png"/> Sign in with Google</div>
                <form ref={formRef} onSubmit={submitHandler}>
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="email" placeholder="Ex: abc@gmail.com" required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" placeholder="Password" required/>
                    <button type="submit">Sign in</button>
                </form>

                <p>Don't have an account? <a style={{color:"blue"}} onClick={()=>navigate("/signup")}>Register</a></p>
            </div>
        </div>
    )
}


export default Signin;