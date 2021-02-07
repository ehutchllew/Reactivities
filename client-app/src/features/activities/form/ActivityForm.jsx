import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { ActivityContext } from "../../../app/stores/activityStore";

export const ActivityForm = observer(({ history, match }) => {
    const activityStore = useContext(ActivityContext);
    const {
        cancelFormOpen,
        clearActivity,
        createActivity,
        editActivity,
        loadActivity,
        selectedActivity,
        submitting,
    } = activityStore;

    useEffect(() => {
        if (match.params.id && !activity.id.length) {
            loadActivity(match.params.id).then(() =>
                setActivity(selectedActivity)
            );
        }

        return () => {
            clearActivity();
        };
    }, [loadActivity, clearActivity, match.params.id, selectedActivity]);

    const [activity, setActivity] = useState({
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
    });

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

            createActivity(newActivity).then(() =>
                history.push(`/activities/${newActivity.id}`)
            );
        } else {
            editActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`)
            );
        }
    };
    if (!activity) return null;
    return (
        <Grid>
            <Grid.Column width={10}>
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
            </Grid.Column>
        </Grid>
    );
});
