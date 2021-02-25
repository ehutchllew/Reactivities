import React from "react";
import { Form, Label } from "semantic-ui-react";

export const TextInput = ({
    input,
    meta: { error, touched },
    placeholder,
    type,
    width,
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} type="text" />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};
