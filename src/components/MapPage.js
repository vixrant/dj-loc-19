import React from "react";

import GoogleMap from "./GoogleMap";
import Drawer from "./Drawer";

import AdminLayout from "../layouts/AdminLayout";
import { useReports } from "../util/hooks";

function MapPage() {
    const reports = useReports();

    return (
        <AdminLayout>
            <Drawer />
            <GoogleMap reports={reports} />
        </AdminLayout>
    );
}

export default MapPage;
