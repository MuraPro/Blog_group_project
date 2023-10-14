import type { FC } from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import Quill from 'react-quill';

import type { TFormArticleProperties } from './FormArticle.type';

import { getValueFromEvent, deleteUploadFile } from '../../../helpers/uploads';

import 'react-quill/dist/quill.snow.css';
import styles from './FormArticle.module.scss';

import { UPLOADS_URL, QUILL_MODULES, QUILL_FORMATS } from '../../constants';
import { articleFormDefaultTags } from './FormArticle.constants';

const FormArticle: FC<TFormArticleProperties> = ({ handleFinish, initialValues }) => (
  <Form name="create-article" layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
    <Form.Item
      name="title"
      label="Заголовок статьи"
      required
      rules={[
        {
          required: true,
          message: 'Введите заголовок статьи'
        }
      ]}
    >
      <Input placeholder="Введите заголовок статьи" />
    </Form.Item>
    <Form.Item
      name="body"
      label="Текст статьи"
      required
      rules={[
        {
          required: true,
          message: 'Введите текст статьи'
        }
      ]}
    >
      <Quill placeholder="Введите текст статьи" formats={QUILL_FORMATS} modules={QUILL_MODULES} theme="snow" />
    </Form.Item>
    <Form.Item
      label="Теги"
      name="tags"
      rules={[
        {
          validator: async (_, tags: string[]) => {
            if (tags?.length > 5) {
              throw new Error('Можно добавить не более 5 тегов');
            }
          }
        }
      ]}
    >
      <Select mode="tags" placeholder="Добавьте желаемые теги" options={articleFormDefaultTags} />
    </Form.Item>
    <Form.Item label="Изображения">
      <Form.Item name="uploads" valuePropName="fileList" getValueFromEvent={getValueFromEvent} noStyle>
        <Upload.Dragger name="file" action={UPLOADS_URL} listType="picture" maxCount={3} onRemove={deleteUploadFile}>
          <p className="ant-upload-text">Перетащите изображение для загрузки</p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
    <Form.Item className={styles.submit}>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form.Item>
  </Form>
);

export { FormArticle };
