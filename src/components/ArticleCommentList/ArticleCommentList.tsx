import { FC, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, List, Alert, Spin, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ArticleComment } from '../ArticleComment/ArticleComment';
import { useGetCommentsQuery, useDeleteCommentMutation } from '../../redux/api/commentsApi';
import { TQueryComment } from '../../types/ApiTypes';
import style from './ArticleCommentList.module.scss';

type ArticleCommentListType = { id: string };

const ArticleCommentList: FC = () => {
  const navigate = useNavigate();
  const { id: articleId } = useParams<ArticleCommentListType>();
  const [showComments, setShowComments] = useState(false);
  const [deleteCommentMutation] = useDeleteCommentMutation();

  const { data: comments = [], isLoading, isError } = useGetCommentsQuery(String(articleId), { skip: !articleId });

  useEffect(() => {
    if (!articleId) {
      navigate('/');
    }
  }, [articleId, navigate]);

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      if (articleId) {
        deleteCommentMutation({ articleId, commentId })
          .unwrap()
          .catch(() => {
            message.error('Ошибка при удалении комментария');
          });
      }
    },
    [articleId, deleteCommentMutation]
  );

  const renderComments = useCallback(
    (commentsArray: TQueryComment[]) =>
      commentsArray.map((comment, index) => (
        <List.Item key={index}>
          <ArticleComment comment={comment} />
          <Popconfirm
            title="Вы уверены, что хотите удалить комментарий?"
            onConfirm={() => handleDeleteComment(comment.id)}
            okText="Удалить"
            cancelText="Отмена"
          >
            <Button icon={<DeleteOutlined />} className={style.deleteBtn} />
          </Popconfirm>
        </List.Item>
      )),
    [handleDeleteComment]
  );

  const toggleCommentsVisibility = () => {
    setShowComments((prev) => !prev);
  };

  if (isError) {
    return <Alert message="Ошибка при загрузке комментариев" type="error" />;
  }

  return (
    <div>
      <Button type="text" className={style.showComment} onClick={toggleCommentsVisibility}>
        {showComments ? 'Скрыть все комментарии' : `Показать все комментарии (${comments.length})`}
      </Button>
      {showComments &&
        (isLoading ? (
          <Spin className={style.load} />
        ) : (
          <List className={style.commentList} itemLayout="horizontal">
            {renderComments(comments)}
          </List>
        ))}
    </div>
  );
};

export default ArticleCommentList;
