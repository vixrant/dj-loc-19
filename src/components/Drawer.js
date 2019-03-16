import React from "react";

import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { FireIcon } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

function FirePanel({ title, items }) {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{ title }</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <List dense>
                {items.map(
                    (text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ),
                )}
            </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
}

function ClippedDrawer() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} /> {/* Shim */}

            <FirePanel title="Fire" items={['Borivali', 'Kandivali']} />

            <FirePanel title="Bird Rescue" items={['Borivali', 'Kandivali']} />

        </Drawer>
    );
}

export default ClippedDrawer;
