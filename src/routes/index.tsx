import { Layout } from '../components/Layout';
import { BlogList } from '../pages/BlogList';
import { BlogPage } from '../pages/BlogPage';
import { ArticlePage } from '../pages/ArticlePage';
import { PageNotFoundView } from '../pages/PageNotFoundView';
import { FormAuthorization } from '../components/FormAuthorization';
import { RegistrationPage } from '../pages/RegistrationPage';
import { PrivateRoute } from './privateRoute/privateRoute';

enum ERoutes {
  BLOGS = '/blogs',
  ARTICLES = '/articles',
  SIGNIN = '/signin',
  SIGNUP = '/signup'
}

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '/', index: true, element: <BlogList /> },
    { path: ERoutes.SIGNIN, element: <FormAuthorization /> },
    { path: ERoutes.SIGNUP, element: <RegistrationPage /> },
    {
      path: ERoutes.BLOGS,
      element: (
        <PrivateRoute>
          <BlogList />
        </PrivateRoute>
      )
    },
    {
      path: `${ERoutes.BLOGS}/:id`,
      element: (
        <PrivateRoute>
          <BlogPage />
        </PrivateRoute>
      )
    },
    {
      path: `${ERoutes.ARTICLES}/:id`,
      element: (
        <PrivateRoute>
          <ArticlePage />
        </PrivateRoute>
      )
    },
    { path: '*', element: <PageNotFoundView /> }
  ]
};

export { mainRoutes };
