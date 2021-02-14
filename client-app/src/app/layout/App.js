import { useContext, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityContext } from "../stores/activityStore";
import { LoadingIndicator } from "./LoadingIndicator";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
import { NotFound } from "./NotFound";

function App({ location }) {
    const activityStore = useContext(ActivityContext);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingIndicator)
        return <LoadingIndicator content="Loading Activities..." />;

    return (
        <div>
            <Route path="/" exact component={HomePage} />
            <Route
                path={"/(.+)"}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: "7em" }}>
                            <h1>{activityStore.title}</h1>
                            <Switch>
                                <Route
                                    path="/activities"
                                    exact
                                    component={ActivityDashboard}
                                />
                                <Route
                                    path="/activities/:id"
                                    component={ActivityDetails}
                                />
                                <Route
                                    key={location.key}
                                    path={["/create", "/manage/:id"]}
                                    component={ActivityForm}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </>
                )}
            />
        </div>
    );
}

export default withRouter(observer(App));
