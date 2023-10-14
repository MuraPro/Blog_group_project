import type { UploadFile } from 'antd/es/upload/interface';

export type TFormArticleProperties = {
  handleFinish: (body: TFormArticle) => void;
  initialValues?: TFormArticle;
};

export type TFormArticle = {
  title: string;
  body: string;
  tags: string[];
  uploads: UploadFile[];
  userId: string;
};
