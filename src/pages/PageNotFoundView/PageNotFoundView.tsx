import { FC } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFoundView:FC = () => {
    const navigateHome = (
        <Link to="/" replace>
            <Button type="primary">Вернуться на главную</Button>
        </Link>
    )
    
    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница не найдена"
            extra={navigateHome}
        />
    )
};

export { PageNotFoundView };
