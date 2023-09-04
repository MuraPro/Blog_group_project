import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { BlogList } from '../../pages/BlogListPage';
import { BlogPage } from '../../pages/BlogPage';
import ERoutes from '../../routes';

import '../../assets/styles/global.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="blogs" replace />} />
        <Route path={ERoutes.BLOGS} element={<BlogList />} />
        <Route path={`${ERoutes.BLOGS}/:id`} element={<BlogPage />} />
      </Route>
    </Routes>
  );
};

export default App;
