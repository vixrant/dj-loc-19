import React from "react";

import { useReports } from "../util/hooks";

import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 1099,
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: "64px",
    },
    toolbar: {
        height: "56px",
    },
}));

function DataPanel({ title, items, expanded }) {
    return (
        <ExpansionPanel defaultExpanded={expanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6'>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List dense>
                    {items.map((doc, index) => (
                        <ListItem button key={index}>
                            <ListItemText
                                primary={doc.area}
                                secondary={doc.validator}
                            />
                        </ListItem>
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

function ClippedDrawer() {
    const classes = useStyles();
    let reports = useReports();

    reports = reports.filter((e) => !!e.location);

    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} /> {/* Shim */}
            <DataPanel
                title='Fire'
                items={reports.filter((e) => e.type === "fire")}
                expanded
            />
            <DataPanel
                title='Structure Collapse'
                items={reports.filter((e) => e.type === "collapse")}
            />
            <DataPanel
                title='Accidents'
                items={reports.filter((e) => e.type === "accident")}
            />
            <DataPanel
                title='Bird Rescue'
                items={reports.filter((e) => e.type === "bird")}
            />
        </Drawer>
    );
}

export default ClippedDrawer;
