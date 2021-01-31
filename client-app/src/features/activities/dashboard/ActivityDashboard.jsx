import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ActivityContext } from "../../../app/stores/activityStore";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = observer(() => {
    const activityStore = useContext(ActivityContext);
    const { editMode, selectedActivity } = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {!editMode && selectedActivity && <ActivityDetails />}
                {editMode && (
                    <ActivityForm
                        key={selectedActivity?.id || 0}
                        selectedActivity={selectedActivity}
                    />
                )}
            </Grid.Column>
        </Grid>
    );
});
