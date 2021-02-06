import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import { ActivityContext } from "../../../app/stores/activityStore";
import { ActivityListeItem } from "./ActivityListItem";

export const ActivityList = observer(() => {
    const activityStore = useContext(ActivityContext);
    const { activitiesByDate } = activityStore;
    return (
        <>
            {activitiesByDate.map(([group, activities]) => {
                return (
                    <>
                        <Label key={group} size="large" color="blue">
                            {group}
                        </Label>
                        <Segment clearing>
                            <Item.Group divided>
                                {activities.map((activity) => (
                                    <ActivityListeItem
                                        activity={activity}
                                        key={activity.id}
                                    />
                                ))}
                            </Item.Group>
                        </Segment>
                    </>
                );
            })}
        </>
    );
});
