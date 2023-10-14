import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Spin, Alert, Select, Input } from 'antd';

import { FormCreateBlog } from '../../components/FormCreateBlog';
import { CardBlog } from '../../components/CardBlog';
import { sortingOptionsAscDesc, OptionsValues } from '../../shared/constants/sortingOptions';
import { BlogType } from './BlogList.type';
import { EventType } from '../../types/EventType';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { debounceDelay } from '../../shared/constants/debounceDelay';
import { ModalGeneral } from '../../shared/components/ModalGeneral';
import { useGetBlogsQuery } from '../../redux/api/blogsApi';
import styles from './BlogList.module.scss';

const BlogList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingValue, setSortingValue] = useState(OptionsValues.DESC);
  const [searchValue, setSearchValue] = useState('');
  const {
    data: blogList,
    isError,
    isLoading
  } = useGetBlogsQuery({ page: currentPage, search: searchValue, sorting: sortingValue });

  const changeSortingValue = (value: OptionsValues) => setSortingValue(value);

  const changeSearchValue = (event: EventType) => setSearchValue(event.target.value);

  const debouncedChangeSearchValue = useDebounce(changeSearchValue, debounceDelay);

  // элементы списка блогов
  const blogs = blogList?.blogs.map((blog: BlogType) => (
    <li className={styles.blogs__item} key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        <CardBlog
          title={blog.title}
          date={blog.createdAt}
          backgroundImage={blog.backgroundImage}
          userId={blog.userId}
        />
      </Link>
    </li>
  ));

  // blogListContent - список блогов или Alert, если блогов нет
  let blogListContent = (
    <Alert type="info" message="Упс!" description="По заданному поиску блоги не найдены!" showIcon />
  );
  if (blogList?.totalCount) blogListContent = <ul className={styles.blogs}>{blogs}</ul>;

  // content - полный контент на странице
  let content = (
    <div className={styles['blog-list']}>
      <div className={styles.header}>
        <div className={styles.sorting}>
          <p className={styles.sorting__title}>Дата публикации</p>
          <Select
            className={styles.sorting__select}
            defaultValue={OptionsValues.DESC}
            size="large"
            onChange={changeSortingValue}
            options={sortingOptionsAscDesc}
          />
        </div>
        <Input
          name="searchBlog"
          size="large"
          placeholder="Найти блог"
          className={styles.search}
          defaultValue={searchValue}
          onChange={debouncedChangeSearchValue}
        />
        <div className={styles.buttonCreateBlog}>
          <ModalGeneral titleModal="Создание блога" textButton="Создать блог">
            <FormCreateBlog />
          </ModalGeneral>
        </div>
      </div>
      {blogListContent}
      <div className={styles.pagination}>
        <Pagination
          total={blogList?.totalCount}
          pageSize={8}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
  if (isError)
    content = (
      <Alert message="Ошибка!" description="Произошла ошибка! Мы уже работаем над этим." type="error" showIcon />
    );
  if (isLoading)
    content = (
      <Spin size="large" tip="loading">
        <div />
      </Spin>
    );
  return <div className={styles.content}>{content}</div>;
};

export { BlogList };
