import React, { useEffect, useState } from "react";

import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { If } from "react-extras";

import { useLocation } from "../util/hooks";

import FireStationIcon from "./firestation.png";
import UserIcon from "./boy.png";
import FireIcon from "./fire.png";
import BirdIcon from "./bird.png";
import AccidentIcon from "./accident.png";
import CollapseIcon from "./collapse.png";

import THEME from "./mapTheme";

const DJ_SANGHVI = { lat: 19.1071901, lng: 72.837155 };

const ICON_MAP = {
    fire: FireIcon,
    bird: BirdIcon,
    accident: AccidentIcon,
    collapse: CollapseIcon,
};

const OPTIONS = {
    disableDefaultUI: true,
    gestureHandling: "greedy",
    styles: THEME,
};

const FIRE_STATIONS = {
    "Andheri West Fire Station": {
        lat: 19.119503289835805,
        lng: 72.84448385238647,
    },
    "Andheri East Fire Station": {
        lat: 19.1158,
        lng: 72.85419999999999,
    },
    "Bandra Fire Station": {
        lat: 19.0583358,
        lng: 72.8302669,
    },
    "Juhu Fire Station": {
        lat: 19.0916826,
        lng: 72.827752,
    },
    "Byculla Fire Station": {
        lat: 18.9750879,
        lng: 72.8282502,
    },
};

function MyMapComponent(props) {
    const userLoc = useLocation();

    const reports = props.reports.filter(e => !!e.location);
    const reportMarkers = reports.map(r => (
        <Marker
            key={r.id}
            icon={ICON_MAP[r.type]}
            position={r.location}
        />
    ));
    
    const fireStationMarkers = [];
    for (let f in FIRE_STATIONS) {
        fireStationMarkers.push(
            <Marker
                key={f}
                icon={{
                    url: FireStationIcon,
                    scaledSize: {
                        width: 32,
                        height: 32,
                    },
                }}
                position={FIRE_STATIONS[f]}
            />,
        );
    }

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={DJ_SANGHVI}
            position={userLoc}
            options={OPTIONS}
        >
            <If condition={!!userLoc}>
                <Marker position={userLoc} icon={UserIcon} />
            </If>
            {reportMarkers}
            {fireStationMarkers}
        </GoogleMap>
    );
}

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
            process.env.REACT_APP_GOOGLE_MAPS_KEY
        }&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ flex: `1 1 auto` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
)(MyMapComponent);
