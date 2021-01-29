import { observer } from "mobx-react-lite";
import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";

export const ActivityList = observer(
    ({ activities, deleteActivity, selectActivity, submitting, target }) => {
        return (
            <Segment clearing>
                <Item.Group divided>
                    {activities.map((activity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    {activity.title}
                                </Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>
                                        {activity.city}, {activity.venue}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button
                                        onClick={() =>
                                            selectActivity(activity.id)
                                        }
                                        floated="right"
                                        content="View"
                                        color="blue"
                                    />
                                    <Button
                                        name={activity.id}
                                        onClick={(e) =>
                                            deleteActivity(e, activity.id)
                                        }
                                        loading={
                                            submitting && target == activity.id
                                        }
                                        floated="right"
                                        content="Delete"
                                        color="red"
                                    />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
        );
    }
);
