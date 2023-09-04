import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';

const { Header } = Layout;
const { Title } = Typography;

const PageHeader: React.FC = () => (
  <Layout>
    <Header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.label}>
          <Link to="/blogs">
            <Title>Blogs-platform</Title>
          </Link>
        </div>

        <div className={styles.registration}>
          <Space direction="vertical" size={16}>
            <Space wrap size={16}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Space>
          </Space>
          <Link to="#" onClick={() => {}}>
            Sign Out
          </Link>
        </div>
      </div>
    </Header>
  </Layout>
);
export default PageHeader;
