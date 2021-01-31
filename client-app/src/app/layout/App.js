import { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityContext } from "../stores/activityStore";
import { LoadingIndicator } from "./LoadingIndicator";

function App() {
    const activityStore = useContext(ActivityContext);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingIndicator)
        return <LoadingIndicator content="Loading Activities..." />;

    return (
        <div>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
                <h1>{activityStore.title}</h1>
                <ActivityDashboard />
            </Container>
        </div>
    );
}

export default observer(App);
