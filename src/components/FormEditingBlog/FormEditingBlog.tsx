import { FC } from 'react';
import { Alert, message } from 'antd';
// Components
import { FormBlog } from '../../shared/components/FormBlog';
// Types
import { TFormBlog } from '../../shared/components/FormBlog/FormBlog.type';
import { TFormCreateArticleProperties } from '../FormCreateArticle/FormCreateArticle.type';
// Helpers
import { convertUploads } from '../../helpers/uploads';
// Api
import { useGetBlogQuery, useEditingBlogMutation } from '../../redux';

const FormEditingBlog: FC<TFormCreateArticleProperties> = ({ blogId, userId, changeVisibilityModal }) => {
  const { data, isSuccess, isError } = useGetBlogQuery(blogId);
  const [editingData] = useEditingBlogMutation();

  const handleFinish = (body: TFormBlog) => {
    editingData({
      body: { ...body, backgroundImage: convertUploads([...body.backgroundImage]), userId },
      blogId
    })
      .unwrap()
      .then(() => {
        changeVisibilityModal ? changeVisibilityModal() : null;
      })
      .catch(() => {
        message.error('Не удалось отредактировать блог');
      });
  };

  if (isError) {
    message.error('Не удалось получить данные блога');
  }

  return isSuccess ? (
    <FormBlog handleFinish={handleFinish} initialValues={data} />
  ) : (
    <Alert message="Извините, что-то пошло не так. Пожалуйста, перезагрузите страницу" type="error" />
  );
};

export { FormEditingBlog };
