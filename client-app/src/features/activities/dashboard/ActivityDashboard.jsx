import React from "react";
import { Grid } from "semantic-ui-react";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = ({
    activities,
    editMode,
    selectActivity,
    selectedActivity,
    setEditMode,
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {!editMode && (
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        setEditMode={setEditMode}
                    />
                )}
                {editMode && <ActivityForm />}
            </Grid.Column>
        </Grid>
    );
};
