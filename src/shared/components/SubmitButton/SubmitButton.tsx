import {useState, useEffect } from 'react';
import { Button, Form } from "antd";
// Types
import { SubmitButtonProperties } from './SubmitButton.type';

const SubmitButton = ({ form, text }: SubmitButtonProperties) => {
    const [submittable, setSubmittable] = useState(false);

    const values: FormData = Form.useWatch([], form) as FormData;

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => setSubmittable(true),
            () => setSubmittable(false)
        );
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {text}
        </Button>
    );
};

export { SubmitButton };
