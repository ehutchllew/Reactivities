import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ActivityContext } from "../../../app/stores/activityStore";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = observer(
    ({
        deleteActivity,
        editActivity,
        setEditMode,
        setSelectedActivity,
        submitting,
        target,
    }) => {
        const activityStore = useContext(ActivityContext);
        const { editMode, selectedActivity } = activityStore;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList
                        deleteActivity={deleteActivity}
                        submitting={submitting}
                        target={target}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    {!editMode && selectedActivity && (
                        <ActivityDetails
                            setEditMode={setEditMode}
                            setSelectedActivity={setSelectedActivity}
                        />
                    )}
                    {editMode && (
                        <ActivityForm
                            key={selectedActivity?.id || 0}
                            editActivity={editActivity}
                            selectedActivity={selectedActivity}
                            setEditMode={setEditMode}
                            submitting={submitting}
                        />
                    )}
                </Grid.Column>
            </Grid>
        );
    }
);
