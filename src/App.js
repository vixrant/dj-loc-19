import React, { Fragment } from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { BrowserRouter as Router, Route } from "react-router-dom";

import GoogleMap from "./components/GoogleMap";
import Drawer from "./components/Drawer";

import AdminLayout from "./layouts/AdminLayout";
import IndexLayout from "./layouts/IndexLayout";

// *** PAGES ***

const MapPage = () => (
    <AdminLayout>
        <Drawer />
        <GoogleMap />
    </AdminLayout>
);

// *** APP ***

function AppContent () {
    return (
        <Fragment>
            <Route path='/' exact component={IndexLayout} />
            <Route path='/admin' exact component={MapPage} />
        </Fragment>
    );
}

function App() {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className='App'>
                        <AppContent />
                    </div>
                </MuiThemeProvider>
            </Router>
        </FirebaseContext.Provider>
    );
}

export default App;
