import React, { Fragment } from 'react';

import Navbar from "../components/Navbar";

function UserLayout({ children }) {
    return(
        <Fragment>
            <Navbar />
            {/* Shim */}
            <div style={{ height: "56px" }} /> 
            { children }
        </Fragment>
    );
}

export default UserLayout;
