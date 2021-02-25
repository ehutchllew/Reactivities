import React from "react";
import { Form, Label } from "semantic-ui-react";

export const TextAreaInput = ({
    input,
    meta: { error, touched },
    placeholder,
    rows,
    width,
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <textarea {...input} placeholder={placeholder} rows={rows} />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};
