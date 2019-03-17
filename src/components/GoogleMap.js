/* eslint-disable no-undef */
import React, { useState } from "react";

import { Snackbar, Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "react-google-maps";
import { If } from "react-extras";

import { useLocation } from "../util/hooks";

import FireStationIcon from "./firestation.png";
import FireIcon from "./fire.png";
import BirdIcon from "./bird.png";
import AccidentIcon from "./accident.png";
import CollapseIcon from "./collapse.png";

import _ from "lodash";

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

const ROUTE_OPTIONS = {
    suppressMarkers: true,
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

function DeployKaSnackbar({ route, cancelcb }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={!!route}
            ContentProps={{
                "aria-describedby": "message-id",
            }}
            message={<span id='message-id'>Deploy a unit? </span>}
            action={[
                <Button
                    key='undo'
                    color='primary'
                    size='small'
                    onClick={cancelcb}
                >
                    DEPLOY
                </Button>,
                <IconButton
                    key='close'
                    aria-label='Close'
                    color='inherit'
                    onClick={cancelcb}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
}

function MyMapComponent(props) {
    const userLoc = useLocation(DJ_SANGHVI);
    const [route, setRoute] = useState(null);

    const reports = props.reports.filter((e) => !!e.location);
    const reportMarkers = reports.map((r) => (
        <Marker
            key={r.id}
            icon={ICON_MAP[r.type]}
            position={r.location}
            onClick={onMarkerClick}
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

    function onMarkerClick(m) {
        const routeSer = new google.maps.DirectionsService();
        const distanceMat = new google.maps.DistanceMatrixService();
        const origins = _(FIRE_STATIONS)
            .values()
            .map((e) => new google.maps.LatLng(e.lat, e.lng))
            .value();

        distanceMat.getDistanceMatrix(
            {
                origins,
                destinations: [m.latLng],
                travelMode: "DRIVING",
            },
            function callback(response) {
                console.log(response);
                const rows = response.rows;
                const ds = [];
                rows.forEach((r) => {
                    const duration = _(r.elements).sumBy(
                        (e) => e.duration.value,
                    );
                    console.log(r, " --> ", duration);
                    ds.push(duration);
                });
                const min = _.min(ds);
                const rindex = _.findIndex(ds, (e) => e === min);
                console.log("INDEX : ", rindex);

                const origin = origins[rindex];
                console.log("FOUND : ", origin);
                routeSer.route(
                    {
                        origin,
                        destination: m.latLng,
                        travelMode: "DRIVING",
                    },
                    function(response) {
                        setRoute(response);
                    },
                );
            },
        );
    }

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={DJ_SANGHVI}
            position={userLoc}
            options={OPTIONS}
        >
            {reportMarkers}
            {fireStationMarkers}
            <If condition={!!route}>
                <DirectionsRenderer
                    directions={route}
                    options={ROUTE_OPTIONS}
                />
            </If>

            <DeployKaSnackbar route={route} cancelcb={() => setRoute(null)} />
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
