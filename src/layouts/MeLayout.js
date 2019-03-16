import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import { useFirebase } from "../components/Firebase";

import "./MeLayout.css";

function MeLayout({ children }) {
    const [loggedIn, setLoggedIn] = useState(true);
    const firebase = useFirebase();

    useEffect(() => {
        // firebase.auth.signOut();
        firebase.auth.onAuthStateChanged(setLoggedIn);
    }, []);

    if (!loggedIn) return <Redirect to='/' />;

    return <div className='MeLayout'>{children}</div>;
}

export default MeLayout;
