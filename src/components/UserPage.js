/* eslint-disable no-undef */
import React, { useEffect, useState, createContext, useContext } from "react";

import { useLocation, useReports } from "../util/hooks";
import { makeStyles } from "@material-ui/styles";
import {
    Dialog,
    DialogActions,
    DialogContentText,
    Button,
    DialogContent,
} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import FireIcon from "./fire.png";
import BirdIcon from "./bird.png";
import AccidentIcon from "./accident.png";
import CollapseIcon from "./collapse.png";

import "../layouts/IndexLayout";
import { useFirebase } from "./Firebase";

const ICON_MAP = {
    fire: FireIcon,
    bird: BirdIcon,
    accident: AccidentIcon,
    collapse: CollapseIcon,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 320,
    },
    inline: {
        display: "inline",
    },
    CardContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    LocationCard: {
        marginTop: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const DJ_SANGHVI = { lat: 19.1071901, lng: 72.837155 };

const UserContext = createContext(null);

function ReportItem({ location, type, number, onCheck }) {
    const classes = useStyles();

    return (
        <ListItem alignItems='flex-start' style={{ width: "100%" }}>
            <ListItemAvatar>
                <Avatar alt='Remy Sharp' src={ICON_MAP[type]} />
            </ListItemAvatar>
            <ListItemText
                primary={location}
                secondary={
                    <React.Fragment>
                        <Typography
                            component='span'
                            className={classes.inline}
                            color='textPrimary'
                        >
                            {type}
                        </Typography>{" "}
                        - {number}
                    </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                <IconButton aria-label='Comments' onClick={onCheck}>
                    <CheckCircleIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function ConfirmDialog(props) {
    const firebase = useFirebase();
    const user = useContext(UserContext);

    const handleYes = () => {
        firebase.firestore
            .collection("public-fire")
            .doc(props.report)
            .update({
                validator: user.email,
                location: props.location,
            })
            .then(() => props.cancelcb());
    };

    return (
        <Dialog {...props} open={!!props.report}>
            <DialogContent>
                <DialogContentText>
                    Are you sure that this report is true? <br />
                    Your location will be recorded and a unit will be
                    dispatched. <br />
                    {`${props.report}`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.cancelcb}>Cancel</Button>
                <Button variant='outlined' color='primary' onClick={handleYes}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function AlignItemsList(props) {
    const classes = useStyles();
    const location = useLocation(DJ_SANGHVI);
    const reports = useReports();
    const [focusReport, setFocusReport] = useState(null);

    const handleClick = (id) => () => setFocusReport(id);

    const reportItems = reports
        .filter((e) => !e.location)
        .map((doc) => (
            <ReportItem
                key={doc.id}
                location={doc.area}
                icon={ICON_MAP[doc.type]}
                type={doc.type}
                onCheck={handleClick(doc.id)}
            />
        ));

    return (
        <div className={classes.CardContainer}>
            <Card className='AreaCard'>
                <List className={classes.root}>{reportItems}</List>
            </Card>

            <Card className={classes.LocationCard}>
                <Typography variant='h6'>Your location</Typography>
                <Typography variant='h6'>{`Lat ${location.lat.toFixed(
                    3,
                )} Lng ${location.lng.toFixed(3)}`}</Typography>
            </Card>

            <ConfirmDialog
                location={location}
                report={focusReport}
                cancelcb={() => setFocusReport(null)}
            />
        </div>
    );
}

function UserPage() {
    const firebase = useFirebase();
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <UserContext.Provider value={user}>
            <AlignItemsList />
        </UserContext.Provider>
    );
}

export default UserPage;
