import React, { useContext, useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityContext } from "../../../app/stores/activityStore";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import { Link } from "react-router-dom";

export const ActivityDetails = observer(({ history, match }) => {
    const activityStore = useContext(ActivityContext);
    const { loadActivity, loadingIndicator, selectedActivity } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (loadingIndicator) {
        return <LoadingIndicator content="Loading Activity..." />;
    }

    if (!selectedActivity) {
        return null;
    }

    return (
        <Card fluid>
            <Image
                src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        as={Link}
                        to={`/manage/${selectedActivity.id}`}
                        basic
                        color="blue"
                        content="edit"
                    />
                    <Button
                        onClick={() => history.push("/activities")}
                        basic
                        color="grey"
                        content="Cancel"
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
});
