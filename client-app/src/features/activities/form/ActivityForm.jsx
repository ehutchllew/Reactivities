import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { Form as FinalForm, Field } from "react-final-form";
import { ActivityContext } from "../../../app/stores/activityStore";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";

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

    // const handleSubmit = () => {
    //     if (!activity.id) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid(),
    //         };

    //         createActivity(newActivity).then(() =>
    //             history.push(`/activities/${newActivity.id}`)
    //         );
    //     } else {
    //         editActivity(activity).then(() =>
    //             history.push(`/activities/${activity.id}`)
    //         );
    //     }
    // };

    const handleFinalFormSubmit = (values) => {
        console.log(values);
    };

    if (!activity) return null;
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="title"
                                    placeholder="Title"
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    component={TextAreaInput}
                                    rows={3}
                                    name="description"
                                    placeholder="Description"
                                    value={activity.description}
                                />
                                <Field
                                    component={SelectInput}
                                    name="category"
                                    options={category}
                                    placeholder="Category"
                                    value={activity.category}
                                />
                                <Field
                                    component={TextInput}
                                    type="datetime-local"
                                    name="date"
                                    placeholder="Date"
                                    value={activity.date}
                                />
                                <Field
                                    component={TextInput}
                                    name="city"
                                    placeholder="City"
                                    value={activity.city}
                                />
                                <Field
                                    component={TextInput}
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
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
});
