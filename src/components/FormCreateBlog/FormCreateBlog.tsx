import { FC } from 'react';
import { message } from 'antd';
// Components
import { FormBlog } from '../../shared/components/FormBlog';
// Types
import { TFormBlog } from '../../shared/components/FormBlog/FormBlog.type';
// Helpers
import { convertUploads } from '../../helpers/uploads';
// Api
import { useCreateBlogMutation } from '../../redux';

const FormCreateBlog: FC = () => {
  const [createBlog] = useCreateBlogMutation();

  const handleFinish = (data: TFormBlog) => {
    createBlog({ data: { ...data, backgroundImage: convertUploads(data.backgroundImage) } })
      .unwrap()
      .then(() => {
        message.success('Блог успешно создан');
      })
      .catch(() => {
        message.error('Не удалось создать блог');
      });
  };

  return <FormBlog handleFinish={handleFinish} />;
};

export { FormCreateBlog };
