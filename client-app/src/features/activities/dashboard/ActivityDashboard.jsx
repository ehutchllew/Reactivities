import React from "react";
import { Grid, List } from "semantic-ui-react";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = ({ activities }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetails />
                <ActivityForm />
            </Grid.Column>
        </Grid>
    );
};
