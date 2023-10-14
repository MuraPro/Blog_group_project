import { FC } from 'react';
import { Avatar, List, message } from 'antd';
import { useGetUserQuery } from '../../redux/api/userApi';
import { dateConversion } from '../../helpers/date';
import type { TQueryComment } from '../../types/ApiTypes';

import style from './ArticleComment.module.scss';

type TArticleCommentProperties = { comment: TQueryComment };

const ArticleComment: FC<TArticleCommentProperties> = ({ comment }) => {
  const { data, isSuccess, isError } = useGetUserQuery(comment.userId);

  if (isError) {
    message.error('Не удалось загрузить комментарий');
  }

  return (
    isSuccess && (
      <List.Item>
        <List.Item.Meta
          className={style.content}
          avatar={<Avatar src="avatar.png" />}
          title={<span className={style.title}>{`${data.firstName} ${data.lastName}`}</span>}
          description={
            <div>
              <p className={style.comment}>{comment.body}</p>
              <span className={style.date}>{dateConversion(comment.createdAt)}</span>
            </div>
          }
        />
      </List.Item>
    )
  );
};

export { ArticleComment };
