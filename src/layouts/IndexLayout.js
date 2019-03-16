import React, { Fragment } from "react";

import { Card, TextField, Typography, Button } from "@material-ui/core";

import { Link, Route, Redirect } from "react-router-dom";
import { useInput } from "../util/hooks";

import "./IndexLayout.css";

function SignUp({ match }) {
    const emailInput = useInput(null);
    const passwordInput = useInput(null)
    const phoneInput = useInput(null);

    const handleSignUp = (e) => {

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
    const passwordInput = useInput(null)

    const handleLogIn = (e) => {

    };

    return (
        <Fragment>
            <Typography variant='h5'>Log in!</Typography>

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
                <Button variant="contained" color="secondary" component={Link} to='/' >
                    Sign Up
                </Button>
                <Button variant="contained" color="primary" onClick={handleLogIn} component={Link} to='/after' >
                    Log In
                </Button>
            </div>
        </Fragment>
    );
}

function AfterLogin() {
    return (
        <Redirect to='/admin' />
    );
}

function IndexLayout({ match }) {
    return (
        <div className='IndexLayout' >
            <Card className='AuthCard'>
                <Route path={`${match.url}`} exact component={LogIn} />
                <Route path={`${match.url}/signup`} exact component={SignUp} />
                <Route path={`${match.url}/after`} exact component={AfterLogin} />
            </Card>
        </div>
    );
}

export default IndexLayout;
