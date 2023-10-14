import { message } from 'antd';
import type { FC } from 'react';
import type { TFormArticle } from '../../shared/components/FormArticle/FormArticle.type';
import type { TFormCreateArticleProperties } from './FormCreateArticle.type';

import { useCreateArticleMutation } from '../../redux/api/articlesApi';
import { convertUploads } from '../../helpers/uploads';
import { FormArticle } from '../../shared/components/FormArticle/FormArticle';

const FormCreateArticle: FC<TFormCreateArticleProperties> = ({ blogId, userId, changeVisibilityModal }) => {
  const [createArticle] = useCreateArticleMutation();

  const handleFinish = (body: TFormArticle) => {
    createArticle({ body: { ...body, uploads: convertUploads(body.uploads), userId }, blogId })
      .unwrap()
      .then(() => {
        changeVisibilityModal ? changeVisibilityModal() : null;
      })
      .catch(() => {
        message.error('Не удалось добавить статью.');
      });
  };

  return <FormArticle handleFinish={handleFinish} />;
};

export { FormCreateArticle };
