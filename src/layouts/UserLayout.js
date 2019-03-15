import React, { Fragment } from 'react';

import Navbar from "../components/Navbar";

function UserLayout({ children }) {
    return(
        <Fragment>
            <Navbar />
            { children }
        </Fragment>
    );
}

export default UserLayout;
