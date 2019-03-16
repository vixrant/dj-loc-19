import React, { useEffect } from "react";

import { useFirebase } from "./Firebase";
import GoogleMap from "./GoogleMap";
import Drawer from "./Drawer";

import AdminLayout from "../layouts/AdminLayout";

function MapPage() {
    const firebase = useFirebase();

    useEffect(() => {
        console.log(firebase.auth.currentUser);
    }, []);

    return (
        <AdminLayout>
            <Drawer />
            <GoogleMap />
        </AdminLayout>
    );
}

export default MapPage
