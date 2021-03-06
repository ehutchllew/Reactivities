import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityContext } from "../../app/stores/activityStore";

export const NavBar = observer(() => {
    const activityStore = useContext(ActivityContext);
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to="/">
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: 10 }}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} to="/activities" />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to="/create"
                        onClick={activityStore.openCreateForm}
                        positive
                        content="Create Activity"
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
});
