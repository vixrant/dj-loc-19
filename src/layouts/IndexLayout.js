import React, { Fragment, useContext } from "react";

import { Card, TextField, Typography, Button } from "@material-ui/core";

import {} from "react-extras";
import { Link, Route, Redirect } from "react-router-dom";
import { useInput } from "../util/hooks";
import { FirebaseContext } from "../components/Firebase";

import "./IndexLayout.css";

function SignUp({ match }) {
    const emailInput = useInput(null);
    const passwordInput = useInput(null)
    const phoneInput = useInput(null);

    // const firebase = useContext(FirebaseContext);

    const handleSignUp = () => {
        
    };

    return (
        <Fragment>
            <Typography variant='h5'>Sign-up as Volunteer</Typography>

            <TextField 
                label='Email' 
                placeholder='Your email' 
                fullWidth 
                {...emailInput}
                />

            <TextField 
                label='Password' 
                type="password"
                placeholder='Your email' 
                fullWidth 
                {...passwordInput}
                />

            <TextField 
                label='Phone Number' 
                type="tel"
                placeholder='Your Phone Number' 
                fullWidth 
                {...phoneInput}
                />

            <div className='button-container'>
                <Button variant="contained" color="secondary" component={Link} to={`${match.url}/login`} >
                    Log In
                </Button>
                <Button variant="contained" color="primary" onClick={handleSignUp} >
                    Sign Up
                </Button>
            </div>
        </Fragment>
    );
}

function LogIn({ match }) {
    const emailInput = useInput(null);
    const passwordInput = useInput(null);

    const firebase = useContext(FirebaseContext);

    const handleLogIn = (e) => {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(alert);
    };

    return (
        <Fragment>
            <Typography variant='h5'>Log in!</Typography>
            <br />

            <TextField 
                label='Email' 
                type="email"
                placeholder='Your email' 
                fullWidth 
                {...emailInput}
                />

            <TextField 
                label='Password' 
                type="password"
                placeholder='Your email' 
                fullWidth 
                {...passwordInput}
                />

            <div className='button-container'>
                <Button variant="flat" color="primary" component={Link} to='/' >
                    Sign Up
                </Button>
                <Button variant="outlined" color="primary" onClick={handleLogIn} component={Link} to='/admin' >
                    Log In
                </Button>
            </div>
        </Fragment>
    );
}

function IndexLayout({ match }) {
    return (
        <div className='IndexLayout' >
            <Card className='AuthCard'>
                <Route path={`${match.url}`} exact component={LogIn} />
                <Route path={`${match.url}/signup`} exact component={SignUp} />
            </Card>
        </div>
    );
}

export default IndexLayout;
