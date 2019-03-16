import { useState, useEffect } from "react";
import { useFirebase } from "../components/Firebase";

function useInput(defvalue) {
    const [value, setValue] = useState(defvalue);

    const onChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange,
    };
}

function useLocation(defvalue) {
    const [location, setLocation] = useState(defvalue);

    useEffect(() => {
        if (navigator.geolocation) {
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (e) => {
                        console.error(e);
                    },
                );
            }, 1000);
        } else {
            console.error("Browser doesn't support geolocation.");
        }
    }, []);

    return location;
}

function useReports() {
    const firebase = useFirebase();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        firebase.firestore.collection("public-fire").onSnapshot((qs) => {
            let x = [];
            qs.forEach((doc) =>
                x.push({
                    id: doc.id,
                    ...doc.data(),
                }),
            );
            setReports(x);
        });

        return firebase.firestore
            .collection("public-fire")
            .onSnapshot(() => {});
    }, []);

    return reports;
}

export { useInput, useLocation, useReports };
