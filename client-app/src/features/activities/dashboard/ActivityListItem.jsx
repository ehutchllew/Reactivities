import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Label } from "semantic-ui-react";

export const ActivityListeItem = ({ activity }) => {
    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>
                        {activity.city}, {activity.venue}
                    </div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        floated="right"
                        content="View"
                        color="blue"
                    />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};
