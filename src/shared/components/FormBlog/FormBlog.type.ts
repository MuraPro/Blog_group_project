import type { UploadFile } from 'antd/es/upload/interface';
import type { TQueryBlog } from '../../../types/ApiTypes';

export type TFormBlogProperties = {
  handleFinish: (body: TFormBlog) => void;
  initialValues?: TQueryBlog;
};

export type TFormBlog = {
  title: string;
  backgroundImage: UploadFile[];
  id: string;
};
