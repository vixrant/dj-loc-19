import React, { useEffect, useState } from "react";

import { Card, TextField, Typography, Button } from "@material-ui/core";

import { Link, Redirect } from "react-router-dom";
import { useInput } from "../util/hooks";
import { useFirebase } from "../components/Firebase";

import "./IndexLayout.css";

function SignUp() {
    const emailInput = useInput(null);
    const passwordInput = useInput(null);
    const phoneInput = useInput(null);

    const firebase = useFirebase();

    const handleSignUp = () => {
        firebase.auth
            .createUserWithEmailAndPassword(
                emailInput.value,
                passwordInput.value,
            )
            .then((user) => {
                user.updatePhoneNumber(phoneInput.value);
                firebase.auth.signInWithEmailAndPassword(
                    emailInput.value,
                    passwordInput.value,
                );
            })
            .catch(console.log);
    };

    return (
        <Card className='AuthCard'>
            <Typography variant='h5'>Sign-up as Volunteer</Typography>

            <TextField
                label='Email'
                placeholder='Your email'
                fullWidth
                {...emailInput}
            />

            <TextField
                label='Password'
                type='password'
                placeholder='Your email'
                fullWidth
                {...passwordInput}
            />

            <TextField
                label='Phone Number'
                type='tel'
                placeholder='Your Phone Number'
                fullWidth
                {...phoneInput}
            />

            <div className='button-container'>
                <Button
                    variant='flat'
                    color='primary'
                    component={Link}
                    to={`/`}
                >
                    Log In
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
            </div>
        </Card>
    );
}

function LogIn() {
    const emailInput = useInput(null);
    const passwordInput = useInput(null);

    const firebase = useFirebase();

    const handleLogIn = (e) => {
        firebase.auth
            .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(alert);
    };

    return (
        <Card className='AuthCard'>
            <Typography variant='h5'>Log in!</Typography>
            <br />

            <TextField
                label='Email'
                type='email'
                placeholder='Your email'
                fullWidth
                {...emailInput}
            />

            <TextField
                label='Password'
                type='password'
                placeholder='Your email'
                fullWidth
                {...passwordInput}
            />

            <div className='button-container'>
                <Button
                    variant='flat'
                    color='primary'
                    component={Link}
                    to='/signup'
                >
                    Sign Up
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleLogIn}
                >
                    Log In
                </Button>
            </div>
        </Card>
    );
}

function IndexLayout({ children }) {
    const [loggedIn, setLoggedIn] = useState(null);
    const firebase = useFirebase();

    useEffect(() => {
        firebase.auth.signOut();
        firebase.auth.onAuthStateChanged(setLoggedIn);
    }, []);

    if (loggedIn) return <Redirect to='/me' />;

    return <div className='IndexLayout'>{children}</div>;
}

export default IndexLayout;
export { LogIn, SignUp };
