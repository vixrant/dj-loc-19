import React, { useEffect, useState } from "react";

import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { If } from "react-extras";

const DJ_SANGHVI = { lat: 19.1071901, lng: 72.837155 };

function MyMapComponent() {
    const [userLoc, setUserLoc] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLoc ({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                console.error,
            );
        } else {
            console.error("Browser doesn't support geolocation.");
        }
    }, []);

    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={DJ_SANGHVI}
            disableDefaultUI={true}
            position={userLoc}>
            <If condition={!!userLoc}>
                <Marker position={userLoc} />
            </If>
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
