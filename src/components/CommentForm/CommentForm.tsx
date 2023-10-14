import { FC, KeyboardEvent, useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { useAddCommentsMutation } from '../../redux/api/commentsApi';
import { CommentFormType, CommentFormProperties } from './CommentForm.type';

import style from './CommentForm.module.scss';

const { TextArea } = Input;

const CommentForm: FC<CommentFormProperties> = ({ articleId, userId }) => {
  const [commentForm] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [addComments] = useAddCommentsMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (data: CommentFormType) => {
    addComments({
      comment: { ...data, userId },
      articleId
    })
      .unwrap()
      .then(() => {
        commentForm.resetFields();
        setIsFormVisible(false);
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: 'Не удалось добавить комментарий'
        });
      });
  };

  const pressKeyHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      commentForm.submit();
    }
  };

  return (
    <div>
      {contextHolder}
      <Button className={style.addBtn} type="primary" onClick={() => setIsFormVisible(true)}>
        Добавить комментарии
      </Button>
      {isFormVisible && (
        <Form onFinish={handleSubmit} className={`${style.commentForm} no-reset`} name="comment" form={commentForm}>
          <Form.Item<CommentFormType> name="body" rules={[{ required: true, message: 'Please input your comment!' }]}>
            <TextArea
              className={style.textArea}
              rows={4}
              placeholder="Напишите ваш комментарий здесь..."
              onKeyDown={pressKeyHandler}
            />
          </Form.Item>
          <Form.Item<CommentFormType> className={style.customFormItem}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default CommentForm;
