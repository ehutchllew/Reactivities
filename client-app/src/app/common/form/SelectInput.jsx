import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

export const SelectInput = ({
    input,
    meta: { error, touched },
    placeholder,
    options,
    width,
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select
                onChange={(e, data) => input.onChange(data.value)}
                options={options}
                placeholder={placeholder}
                value={input.value}
            />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};
