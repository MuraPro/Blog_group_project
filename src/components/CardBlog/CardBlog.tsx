import React from 'react';

import { Card } from 'antd';
// Types
import { CardBlogPropertiesType } from './CardBlog.type';
// Helpers
import { dateConversion } from '../../helpers/date';
// Scss
import style from './CardBlog.module.scss';

const { Meta } = Card;

const CardBlog: React.FC<CardBlogPropertiesType> = ({ title, date, backgroundImage }) => (
  <Card
    hoverable
    style={{ width: 340 }}
    cover={backgroundImage && <img className={style.backgroundImage} alt="example" src={backgroundImage} />}
  >
    <div className={style.date}>{dateConversion(date)}</div>
  </Card>
);

export { CardBlog };
