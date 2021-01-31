import React, { useContext, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { ActivityContext } from "../../../app/stores/activityStore";

export const ActivityForm = observer(({ selectedActivity }) => {
    const activityStore = useContext(ActivityContext);
    const {
        cancelFormOpen,
        createActivity,
        editActivity,
        submitting,
    } = activityStore;
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

    const handleInputChange = (event) => {
        setActivity({
            ...activity,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };

            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Title"
                    value={activity.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    rows={2}
                    name="description"
                    placeholder="Description"
                    value={activity.description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="category"
                    placeholder="Category"
                    value={activity.category}
                />
                <Form.Input
                    onChange={handleInputChange}
                    type="datetime-local"
                    name="date"
                    placeholder="Date"
                    value={activity.date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="city"
                    placeholder="City"
                    value={activity.city}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="venue"
                    placeholder="Venue"
                    value={activity.venue}
                />
                <Button
                    floated="right"
                    loading={submitting}
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    onClick={cancelFormOpen}
                    floated="right"
                    type="cancel"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
});
