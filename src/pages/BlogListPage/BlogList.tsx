import { Link } from 'react-router-dom';
import { CardBlog } from '../../components/CardBlog';
import { CardBlogPropertiesType } from '../../types/Types';
import blogsApi from '../../redux/services/blogsApi';
import { Spin } from 'antd';
import styles from './Blog-list.module.scss';

const BlogList = () => {
  const { data = [], isLoading, isError } = blogsApi.useGetBlogsQuery('blogs');

  const spinner = isLoading ? (
    <div className={styles.spinner}>
      <Spin />
    </div>
  ) : null;

  const error = isError ? <h1>Error....</h1> : null;

  return (
    <div className={styles.container}>
      {spinner}
      {error}
      <ul className={styles.list}>
        {data.map((item: CardBlogPropertiesType) => (
          <li key={item.id}>
            <Link to={`/blogs/${item.id}`}>
              <CardBlog {...item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
