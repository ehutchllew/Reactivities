import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Item, Segment } from "semantic-ui-react";
import { ActivityContext } from "../../../app/stores/activityStore";
import { ActivityListeItem } from "./ActivityListItem";

export const ActivityList = observer(() => {
    const activityStore = useContext(ActivityContext);
    const { activitiesByDate } = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <ActivityListeItem activity={activity} key={activity.id} />
                ))}
            </Item.Group>
        </Segment>
    );
});
