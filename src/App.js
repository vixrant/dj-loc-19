import React, { Component } from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

import GoogleMap from './components/GoogleMap';

import UserLayout from "./layouts/UserLayout";

const AppContent = () => (
    <UserLayout>
        <GoogleMap />
    </UserLayout>
);

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className='App'>
                        <AppContent />
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
