import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import style from './CommentForm.module.scss';

const { TextArea } = Input;

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const isDisabled = comment.trim().length === 0;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setComment('');
    console.log(comment);
  };

  const pressKeyHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter' && !isDisabled) {
      submitHandler(event);
    }
  };

  const changeValueHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <Form onFinish={submitHandler} className={`${style.commentForm} no-reset`}>
      <Form.Item>
        <TextArea
          className={style.textArea}
          rows={4}
          placeholder="Write your comment here..."
          value={comment}
          onChange={changeValueHandler}
          onKeyDown={pressKeyHandler}
        />
      </Form.Item>
      <Form.Item className={style.customFormItem}>
        <Button type="primary" htmlType="submit" disabled={isDisabled} onClick={submitHandler}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
