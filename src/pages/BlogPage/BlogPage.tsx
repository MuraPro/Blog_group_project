import React, { FC, useState } from 'react';
import { Alert, Button, Pagination, Select, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import styles from './BlogPage.module.scss';
import { ArticleCard } from '../../components/ArticleCard';
import { useGetArticlesQuery, useGetBlogQuery } from '../../redux';
import { ARTICLES_PAGE_SIZE } from '../../shared/constants/api';
import { sortingOptionsAscDesc, OptionsValues } from '../../shared/constants/sortingOptions';
import { ModalGeneral } from '../../shared/components/ModalGeneral';
import { FormCreateArticle } from '../../components/FormCreateArticle';
import { FormEditingBlog } from '../../components/FormEditingBlog';
import { useAppSelector } from '../../shared/hooks/stateHook';
import { selectUser } from '../../redux/features/userSlice';
import { LeftOutlined } from '@ant-design/icons';

type ParametersType = { id: string };

const BlogPage: FC = () => {
  const { id } = useParams<ParametersType>() as ParametersType;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState(OptionsValues.DESC);

  const auth = useAppSelector(selectUser);

  const userId = auth?.user?.id;

  const { data: blog, isError: isErrorBlog, isSuccess: isSuccessBlog } = useGetBlogQuery(id);
  const {
    data,
    isLoading,
    isError: isErrorArticles
  } = useGetArticlesQuery({ blogId: id, sorting: sortingOption, page: currentPage });

  const renderedArticles = data?.articles.map((article) => (
    <li key={article.id} className={styles.articlesListItem}>
      <ArticleCard {...article} />
    </li>
  ));

  const error = (isErrorBlog || isErrorArticles) && (
    <div className={styles.error}>
      <Alert message="Извините, что-то пошло не так. Пожалуйста, перезагрузите страницу" type="error" />
    </div>
  );

  const onChangePageNumber = (page: number) => setCurrentPage(page);

  const onChangeSorting = (value: OptionsValues) => setSortingOption(value);

  return (
    <>
      {error}
      {!isErrorBlog && !isErrorArticles && (
        <Spin spinning={isLoading} size="large" className={styles.loader}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2 className={styles.titleName}>{blog?.title}</h2>
            </div>
            <div className={styles.sortingPanel}>
              <div>
                <Select
                  className={styles.sortingSelect}
                  defaultValue={OptionsValues.DESC}
                  style={{ width: 160 }}
                  onChange={onChangeSorting}
                  options={sortingOptionsAscDesc}
                />
                {isSuccessBlog && userId && (
                  <ModalGeneral textButton="Добавить статью" titleModal="Добавление статьи">
                    <FormCreateArticle blogId={blog.id} userId={userId} />
                  </ModalGeneral>
                )}
              </div>
              <div className={styles.sortingBlog}>
                {isSuccessBlog && userId && (
                  <ModalGeneral textButton="Редактировать блог" titleModal="Редактирование блога">
                    <FormEditingBlog blogId={blog.id} userId={userId} />
                  </ModalGeneral>
                )}
                <Link to="/blogs" className={styles.link}>
                  <Button type="dashed">
                    <LeftOutlined />
                    <span className={styles.link__text}>Список блогов</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.list}>
              <ul className={styles.articles}>{renderedArticles}</ul>
              <div className={styles.pagination}>
                <Pagination
                  pageSize={ARTICLES_PAGE_SIZE}
                  defaultCurrent={1}
                  current={currentPage}
                  total={data?.totalCount}
                  onChange={onChangePageNumber}
                  hideOnSinglePage
                />
              </div>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export { BlogPage };
