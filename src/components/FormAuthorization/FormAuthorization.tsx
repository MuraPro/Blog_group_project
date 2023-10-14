import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message, Typography } from 'antd';
import { useLoginUserMutation } from '../../redux/api/authApi';
import { useAppDispatch } from '../../shared/hooks/stateHook';
import { setUser } from '../../redux/features/userSlice';
// Components
import { SubmitButton } from '../../shared/components/SubmitButton';
// Style
import style from '../../assets/styles/IdentificationForm.module.scss';

const { Title } = Typography;

const FormAuthorization: FC = () => {
  const [authorizationForm] = Form.useForm();
  const navigate = useNavigate();
  const [loginUser, { data: loginData, isSuccess: isLoginSuccess }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoginSuccess) {
      message.success('Авторизация пройдена');
      dispatch(setUser(loginData));
      navigate('/blogs', { replace: true });
    }
  }, [isLoginSuccess]);

  const onFinish = (values: any) => {
    const { email, password } = values;
    loginUser({ email, password })
      .unwrap()
      .catch((error) => {
        message.error(`${error.data}`);
      });
  };

  const onFinishFailed = () => {
    authorizationForm.setFields([
      {
        name: 'email',
        errors: ['']
      },
      {
        name: 'password',
        errors: ['Неверный логин или пароль']
      }
    ]);
  };
  return (
    <Form
      name="authorization"
      form={authorizationForm}
      className={style.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className={style.title} level={3}>
        Авторизация
      </Title>
      <Form.Item label="Username" name="email" rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
        <Input name="email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
        <Input.Password name="password" />
      </Form.Item>

      <Form.Item>
        <SubmitButton form={authorizationForm} text="Войти" />
      </Form.Item>
      <p className={style.footer}>
        Нет аккаунта? <Link to="#">Зарегестрироваться</Link>
      </p>
    </Form>
  );
};

export { FormAuthorization };
