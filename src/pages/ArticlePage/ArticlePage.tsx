import { FC } from 'react';
import { Space, Tag, Alert, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

import { ArticleCommentList } from '../../components/ArticleCommentList';
import { CommentForm } from '../../components/CommentForm';
import { dateConversion } from '../../helpers/date';
import { useGetArticleQuery } from '../../redux';
import { useGetUserQuery } from '../../redux/api/userApi';
import styles from './ArticlePage.module.scss';

type ParametersType = { id: string };

const ArticlePage: FC = () => {
  const { id } = useParams<ParametersType>() as ParametersType;
  const { data: article, isError, isLoading } = useGetArticleQuery({ articleId: id });
  const userId = article ? article.userId : '';
  const { data: user } = useGetUserQuery(userId);

  const tagList = article?.tags?.map((tag) => (
    <Tag key={tag} className={styles.tag}>
      {tag}
    </Tag>
  ));

  const uploadList = article?.uploads.map((upload, index) => (
    <img src={upload.url} key={index} alt={upload.name} width="300px" />
  ));

  const date = article ? dateConversion(article?.createdAt) : undefined;

  let content = (
    <div className={styles.article}>
      <div className={styles.header}>
        <h1 className={styles.title}>{article?.title}</h1>
        <Space className={styles.tags}>{tagList}</Space>
        <Link to={`/blogs/${article?.blogId}`} className={styles.link}>
          <LeftOutlined />
          <span className={styles.link__text}>Back to list</span>
        </Link>
      </div>
      <h2 className={styles.author}>By {user?.firstName}</h2>
      <div className={styles.body}>{article?.body}</div>
      <Space size="middle">{uploadList}</Space>
      <p className={styles.date}>Статья создана {date}</p>
      <ArticleCommentList />
      <CommentForm articleId={id} userId={userId} />
    </div>
  );

  if (isError)
    content = (
      <Alert message="Ошибка!" description="Произошла ошибка! Мы уже работаем над этим." type="error" showIcon />
    );

  if (isLoading)
    content = (
      <Spin size="large" tip="Загрузка" className={styles.spin}>
        <div />
      </Spin>
    );
  return <div className={styles.content}>{content}</div>;
};

export { ArticlePage };
