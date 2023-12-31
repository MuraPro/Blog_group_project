import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '../Header';
import styles from './Layout.module.scss';

const Layout: FC = (): JSX.Element => (
  <div className={styles.wrapper}>
    <PageHeader />
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  </div>
);

export { Layout };
