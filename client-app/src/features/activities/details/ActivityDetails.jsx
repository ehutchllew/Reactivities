import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

export const ActivityDetails = ({ selectedActivity }) => {
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
                    <Button basic color="blue" content="edit" />
                    <Button basic color="gray" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
