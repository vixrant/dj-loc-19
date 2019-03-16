import React, { Fragment } from "react";

import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
    return (
        <Fragment>
            <Navbar />
            <div style={{ flex: `1 1 auto`, display: "flex" }}>{children}</div>
        </Fragment>
    );
}

export default AdminLayout;
