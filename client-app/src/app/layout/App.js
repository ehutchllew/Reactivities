import { useContext, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { NavBar } from "../../features/nav/NavBar";
import { ActivitiesService } from "../api/agent";
import { ActivityContext } from "../stores/activityStore";
import { LoadingIndicator } from "./LoadingIndicator";

function App() {
    const activityStore = useContext(ActivityContext);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState("");

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    const handleDeleteActivity = (event, id) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        ActivitiesService.delete(id)
            .then(() => {
                if (selectedActivity && id === selectedActivity.id) {
                    setSelectedActivity(null);
                }
                setActivities([
                    ...activities.filter((activity) => activity.id !== id),
                ]);
            })
            .then(() => setSubmitting(false));
    };

    if (activityStore.loadingIndicator)
        return <LoadingIndicator content="Loading Activities..." />;

    return (
        <div>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
                <h1>{activityStore.title}</h1>
                <ActivityDashboard
                    activities={activityStore.activities}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </div>
    );
}

export default observer(App);
