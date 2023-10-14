import { FC } from 'react';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import styles from './ArticleCard.module.scss';

import { TQueryArticle } from '../../types/ApiTypes';
import { dateConversion } from '../../helpers/date';
import { useGetUserQuery } from '../../redux/api/userApi';

const SHORT_TEXT_LENGTH = 600;

const cutArticleText = (text: string): string => {
  const shortText = text.slice(0, SHORT_TEXT_LENGTH);
  const paragraph = '</p>';
  const lastParagraphIndex = shortText.lastIndexOf(paragraph);
  return shortText.slice(0, lastParagraphIndex + paragraph.length);
};

const ArticleCard: FC<TQueryArticle> = ({ title, body, userId, tags, createdAt, id }) => {
  const articleText = body.length > SHORT_TEXT_LENGTH ? cutArticleText(body) : body;

  const { data, isSuccess } = useGetUserQuery(userId);

  return (
    isSuccess && (
      <div className={styles.container}>
        <Card>
          <article className={styles.article}>
            <div className={styles.content}>
              <section className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.author}>
                  <p className={styles.authorName}>{`${data?.firstName} ${data?.lastName}`}</p>
                </div>
              </section>
              <section>{parse(articleText)}</section>
              <section>{tags?.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}</section>
            </div>
            <div className={styles.footer}>
              <p className={styles.created}>{dateConversion(createdAt)}</p>
              <Link to={`/articles/${id}`}>Читать далее</Link>
            </div>
          </article>
        </Card>
      </div>
    )
  );
};

export { ArticleCard };
