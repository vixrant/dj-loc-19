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
                    {items.map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

function ClippedDrawer() {
    const classes = useStyles();
    const reports = useReports();

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
                items={reports.map((e) => e.data.area)}
                expanded
            />
            <DataPanel
                title='Structure Collapse'
                items={["Borivali", "Kandivali"]}
            />
            <DataPanel title='Accidents' items={["Borivali", "Kandivali"]} />
            <DataPanel title='Bird Rescue' items={["Borivali", "Kandivali"]} />
        </Drawer>
    );
}

export default ClippedDrawer;
