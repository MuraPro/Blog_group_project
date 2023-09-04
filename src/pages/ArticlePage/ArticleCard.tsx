import React from 'react';
import { Card, Tag } from 'antd';
import parse from 'html-react-parser';
import { ArticleCardType, DateConversionType } from '../../types/Types';
import styles from './ArticleCard.module.css';

const dateConversion: DateConversionType = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDay() + 1 > 10 ? newDate.getDay() + 1 : `0${newDate.getDay() + 1}`;
  const month = newDate.getMonth() + 1 > 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
  const fullYear = newDate.getFullYear();

  return `${day}.${month}.${fullYear}`;
};

const cutArticleText = (text: string): string => {
  const shortText = text.slice(0, 800);
  const paragraph = '</p>';
  const lastParagraphIndex = shortText.lastIndexOf(paragraph);
  return shortText.slice(0, lastParagraphIndex + paragraph.length);
};

const ArticleCard: React.FC<ArticleCardType> = (properties) => {
  const { title, body, author, tags, date } = properties;
  const articleText = body.length > 800 ? cutArticleText(body) : body;

  return (
    <div className={styles.container}>
      <Card>
        <article className={styles.article}>
          <section className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}>{author.userName}</p>
          </section>
          <section>{parse(articleText)}</section>
          <section>{tags?.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</section>
          <div className={styles.date}>{dateConversion(date)}</div>
          <button type="button" className={styles.button}>
            Читать далее
          </button>
        </article>
      </Card>
    </div>
  );
};

export default ArticleCard;
