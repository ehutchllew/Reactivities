import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export const ActivityForm = ({ setEditMode, selectedActivity }) => {
    const initializeForm = () => {
        if (selectedActivity) {
            return selectedActivity;
        } else {
            return {
                title: "",
                category: "",
                description: "",
                date: "",
                city: "",
                venue: "",
            };
        }
    };

    const [activity, setActivity] = useState(initializeForm);

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" value={activity.title} />
                <Form.TextArea
                    rows={2}
                    placeholder="Description"
                    value={activity.description}
                />
                <Form.Input placeholder="Category" value={activity.category} />
                <Form.Input
                    type="date"
                    placeholder="Date"
                    value={activity.date}
                />
                <Form.Input placeholder="City" value={activity.city} />
                <Form.Input placeholder="Venue" value={activity.venue} />
                <Button
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    onClick={() => setEditMode(false)}
                    floated="right"
                    type="cancel"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};
