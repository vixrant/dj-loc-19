import React, { useEffect, useState } from "react";

import GoogleMap from "./GoogleMap";
import Drawer from "./Drawer";

import AdminLayout from "../layouts/AdminLayout";

function MapPage() {
    return (
        <AdminLayout>
            <Drawer />
            <GoogleMap />
        </AdminLayout>
    );
}

export default MapPage;
