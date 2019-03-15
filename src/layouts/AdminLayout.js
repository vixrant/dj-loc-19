import React, { Fragment } from "react";

import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
}

export default AdminLayout;
