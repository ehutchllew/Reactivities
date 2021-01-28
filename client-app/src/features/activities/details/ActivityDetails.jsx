import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

export const ActivityDetails = ({
    selectedActivity,
    setEditMode,
    setSelectedActivity,
}) => {
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
                        onClick={() => setEditMode(true)}
                        basic
                        color="blue"
                        content="edit"
                    />
                    <Button
                        onClick={() => setSelectedActivity(null)}
                        basic
                        color="grey"
                        content="Cancel"
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
