import React, { Fragment } from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { BrowserRouter as Router, Route } from "react-router-dom";

import GoogleMap from "./components/GoogleMap";

import AdminLayout from "./layouts/AdminLayout";

// *** PAGES ***

const MapPage = () => (
    <AdminLayout>
        <GoogleMap />
    </AdminLayout>
);

// *** APP ***

const AppContent = () => (
    <Fragment>
        <Route path='/' exact component={MapPage} />
        <Route path='/admin' exact component={MapPage} />
    </Fragment>
);

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
