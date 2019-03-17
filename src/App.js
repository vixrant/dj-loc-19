import React, { Fragment } from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { BrowserRouter as Router, Route } from "react-router-dom";

import IndexLayout, { LogIn, SignUp } from "./layouts/IndexLayout";
import MeLayout from "./layouts/MeLayout";
import UserPage from "./components/UserPage";
import MapPage from "./components/MapPage";

const LogInPage = () => (
    <IndexLayout>
        <LogIn />
    </IndexLayout>
);

const SignUpPage = () => (
    <IndexLayout>
        <SignUp />
    </IndexLayout>
);

const MePage = () => (
    <MeLayout>
        <UserPage />
    </MeLayout>
);

// *** APP ***

function AppContent() {
    return (
        <Fragment>
            <Route path='/' exact component={LogInPage} />
            <Route path='/signup' exact component={SignUpPage} />
            <Route path='/me' exact component={MePage} />
            <Route path='/admin' exact component={MapPage} />
        </Fragment>
    );
}

function App() {
    return (
        <FirebaseContext.Provider value={Firebase}>
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
