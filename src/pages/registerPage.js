import React, { useRef, useState } from "react";
import "../styles/register.scss";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth, storage, provider } from "../firebase";
import { useNavigate } from "react-router";

const Register = ()=>{
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
            const name = formRef.current.userName.value;
            const email = formRef.current.email.value;
            const password = formRef.current.password.value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="register-cont">
            <div className="sidebar">
                <h1>Board.</h1>
            </div>
           
            <div className="form-cont">
                <div className="header">
                <h1>Register</h1>
                <p>Register to create a new account</p>
                </div>
                <form ref={formRef} onSubmit={submitHandler}>
                    <label htmlFor="userName">User Name</label>
                    <input name="userName" type="text" placeholder="User Name"/>
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="email" placeholder="Ex: abc@gmail.com" required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" placeholder="Password" required/>
                    <button type="submit">Submit</button>
                </form>
                <p>Do you have an account? <a style={{color:"blue"}} onClick={()=>navigate("/")}>Sign in</a></p>
                <p>or</p>
                <div className="google-btn" onClick={signinHandler}><img src="https://cdn-icons-png.flaticon.com/128/281/281764.png"/> Sign in with Google</div>
            </div>
        </div>
    )
}

export default Register;