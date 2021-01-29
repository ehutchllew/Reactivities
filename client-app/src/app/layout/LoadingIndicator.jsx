import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
export const LoadingIndicator = ({ content, inverted = true }) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
};
