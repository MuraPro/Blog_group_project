import { Spin } from 'antd';
import { ArticleCard } from '../ArticlePage';
import { ArticleCardType } from '../../types/Types';
import articlesApi from '../../redux/services/articlesApi';
import styles from './blog-page.module.scss';

const BlogPage = () => {
  const { data = [], isLoading, isError } = articlesApi.useGetArticlesQuery('blogs');

  const spinner = isLoading ? (
    <div className={styles.spinner}>
      <Spin />
    </div>
  ) : null;

  const error = isError ? <h1>Error....</h1> : null;
  return (
    <div>
      <ul>
        {data.map((item: ArticleCardType) => (
          <li key={item.id}>
            <ArticleCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
