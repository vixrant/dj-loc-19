import { useContext } from "react";
import FirebaseContext from "./context";
import Firebase from "./firebase";

function useFirebase() {
    const firebase = useContext(FirebaseContext);
    return firebase;
}

export default Firebase;
export { useFirebase, FirebaseContext };
