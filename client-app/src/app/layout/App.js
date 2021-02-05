import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityContext } from "../stores/activityStore";
import { LoadingIndicator } from "./LoadingIndicator";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";

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
                <Route path="/" exact component={HomePage} />
                <Route path="/activities" exact component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route path="/create" component={ActivityForm} />
            </Container>
        </div>
    );
}

export default observer(App);
