import { Card, Avatar } from 'antd';
// Types
import { DateConversionType, CardBlogPropertiesType } from '../../types/Types';
// Scss
import style from './CardBlog.module.scss';

const { Meta } = Card;

const dateConversion: DateConversionType = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDay() + 1 > 10 ? newDate.getDay() + 1 : `0${newDate.getDay() + 1}`;
  const month = newDate.getMonth() + 1 > 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
  const fullYear = newDate.getFullYear();

  return `${day}.${month}.${fullYear}`;
};

const CardBlog = (properties: CardBlogPropertiesType) => {
  const { title, date, backgroundImage, author } = properties;
  const { avatarImage } = author;

  return (
    <Card
      hoverable
      style={{ width: 340 }}
      cover={
        backgroundImage ? <img className={style.backgroundImage} alt="example" src={backgroundImage} /> : undefined
      }>
      <Meta avatar={<Avatar src={avatarImage} />} title={title} />
      <div className={style.date}>{dateConversion(date)}</div>
    </Card>
  );
};

export default CardBlog;
