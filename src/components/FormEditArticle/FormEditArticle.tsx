import { Alert, message } from 'antd';
import type { FC } from 'react';
import type { TFormArticle } from '../../shared/components/FormArticle/FormArticle.type';
import type { TFormEditArticleProperties } from './FormEditArticle.type';
import { useEditArticleMutation, useGetArticleQuery } from '../../redux/api/articlesApi';
import { convertUploads } from '../../helpers/uploads';
import { FormArticle } from '../../shared/components/FormArticle/FormArticle';
import { useAppSelector } from '../../shared/hooks/stateHook';
import { selectUser } from '../../redux/features/userSlice';

const FormEditArticle: FC<TFormEditArticleProperties> = ({ blogId, articleId }) => {
  const auth = useAppSelector(selectUser);
  const userId = auth?.user?.id;

  const {
    data: initialValues,
    isSuccess,
    isError
  } = useGetArticleQuery({
    articleId
  });

  const [editArticle] = useEditArticleMutation();

  const handleFinish = (body: TFormArticle) => {
    editArticle({
      body: { ...body, uploads: convertUploads(body.uploads), userId },
      blogId,
      articleId
    })
      .unwrap()
      .catch(() => {
        message.error('Не удалось отредактировать статью');
      });
  };

  if (isError) {
    message.error('Не удалось получить данные статьи');
  }

  return isSuccess ? (
    <FormArticle handleFinish={handleFinish} initialValues={initialValues as TFormArticle} />
  ) : (
    <Alert message="Извините, что-то пошло не так. Пожалуйста, перезагрузите страницу" type="error" />
  );
};

export { FormEditArticle };
