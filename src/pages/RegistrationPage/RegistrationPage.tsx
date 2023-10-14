import { FC, useEffect } from 'react';
import { Form, Input, message, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import { Link, useNavigate } from 'react-router-dom';

import { SubmitButton } from '../../shared/components/SubmitButton';
import { useRegisterUserMutation } from '../../redux/api/authApi';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../shared/hooks/stateHook';
import { TRegistrationUser } from '../../types/ApiTypes';
import styles from '../../assets/styles/IdentificationForm.module.scss';

const { Title } = Typography;

const validationRepeatPassword: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  }
});

const RegistrationPage: FC = () => {
  const [registrationForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registerUser, { data: registerData, isSuccess: isRegisterSuccess }] = useRegisterUserMutation();

  useEffect(() => {
    if (isRegisterSuccess) {
      message.success('Регистрация пройдена');
      dispatch(setUser(registerData));
      navigate('/blogs', { replace: true });
    }
  }, [isRegisterSuccess]);

  const onFinish = (value: TRegistrationUser) => {
    const { firstName, lastName, email, password } = value;
    registerUser({ firstName, lastName, email, password })
      .unwrap()
      .catch((error) => {
        message.error(`${error.data}`);
      });
  };

  return (
    <Form
      className={styles.form}
      form={registrationForm}
      name="registration"
      layout="vertical"
      autoComplete="on"
      onFinish={onFinish}
    >
      <Title className={styles.title} level={3}>
        Регистрация
      </Title>
      <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: 'Пожалуйста, заполните имя' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: 'Пожалуйста, заполните фамилию' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Электронная почта"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, заполните электронную почту'
          },
          {
            type: 'email',
            message: 'Введите корректный адрес электронной почты'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль'
          },
          {
            min: 8,
            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[#&@])[\d#&@A-Za-z]+$/,
            message:
              'Пароль должен состоять не менее чем из 8 символов, использовать сочетание по крайней мере 1 заглавной буквы, 1 цифры и 1 специального символа (#, @, &)'
          }
        ]}
      >
        <Input type="password" autoComplete="true" />
      </Form.Item>
      <Form.Item
        name="repeatPassword"
        label="Подтверждение пароля"
        rules={[{ required: true, message: 'Пожалуйста, введите подтверждение пароля' }, validationRepeatPassword]}
      >
        <Input type="password" autoComplete="true" />
      </Form.Item>
      <Form.Item>
        <SubmitButton form={registrationForm} text="Зарегистрироваться" />
      </Form.Item>
      <p className={styles.footer}>
        Уже зарегистрированы? <Link to="/auth">Войти</Link>
      </p>
    </Form>
  );
};

export { RegistrationPage };
