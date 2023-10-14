import { FC } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { Button, Form, Input, Upload } from 'antd';
// Type
import { TFormBlogProperties, TFormBlog } from './FormBlog.type';
// Helpers
import { getValueFromEvent } from '../../../helpers/uploads';
import { UPLOADS_URL } from '../../constants';

const FormBlog: FC<TFormBlogProperties> = ({ handleFinish, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Form
      name="blog"
      layout="vertical"
      onFinish={(data: TFormBlog) => {
        handleFinish(data);
        form.resetFields();
      }}
      initialValues={initialValues}
      form={form}
    >
      <Form.Item label="Имя блога" name="title" rules={[{ required: true, message: 'Пожалуйста, укажите имя блога!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Постер блога"
        name="backgroundImage"
        valuePropName="fileList"
        getValueFromEvent={getValueFromEvent}
        rules={[{ required: true, message: 'Пожалуйста, загрузите картинку!' }]}
      >
        <Upload name="file" action={UPLOADS_URL} listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Загрузить картинку</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export { FormBlog };
