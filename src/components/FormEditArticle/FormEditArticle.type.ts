import { TFormCreateArticleProperties } from '../FormCreateArticle/FormCreateArticle.type';

export type TFormEditArticleProperties = TFormCreateArticleProperties & { articleId: string };
