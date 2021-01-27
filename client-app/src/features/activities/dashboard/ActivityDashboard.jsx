import React from "react";
import { Grid } from "semantic-ui-react";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = ({
    activities,
    createActivity,
    deleteActivity,
    editActivity,
    editMode,
    selectActivity,
    selectedActivity,
    setEditMode,
    setSelectedActivity,
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    selectActivity={selectActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {!editMode && (
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        setEditMode={setEditMode}
                        setSelectedActivity={setSelectedActivity}
                    />
                )}
                {editMode && (
                    <ActivityForm
                        key={selectedActivity?.id || 0}
                        createActivity={createActivity}
                        editActivity={editActivity}
                        selectedActivity={selectedActivity}
                        setEditMode={setEditMode}
                    />
                )}
            </Grid.Column>
        </Grid>
    );
};
