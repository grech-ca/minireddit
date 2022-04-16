import { FC, useState, Fragment } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Card, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import { Input, VKButton } from 'components';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { pick } from 'lodash';

import { registrationSchema, loginSchema } from 'validation/client';
import { LoadingOverlay } from 'components/loading-overlay';

export type AuthFormType = 'registration' | 'login';

export interface AuthFormProps {
  type: AuthFormType; 
}

export const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const isLogin = type === 'login';

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setFocus,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registrationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (type === 'registration') {
        await axios.post('/api/register', pick(values, 'email', 'name', 'password'));
        router.push('/login');
      } else {
        await axios.post('/auth/login', {
          nameOrEmail: values.name,
          password: values.password,
        });
      }
    } catch (error) {
      toast.error('Ошибка');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="my-5 overflow-hidden">
      {loading && <LoadingOverlay />}
      <CardBody>
      <h3>{isLogin ? 'Вход' : 'Регистрация'}</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={isLogin ? 'Имя или адрес эл. почты' : 'Имя'}
            type="name"
            error={errors.name?.message}
            {...register('name')}
          />
          {!isLogin && (
            <Input
              label="E-Mail"
              type="email"
              error={errors.email?.message}
              placeholder="example@mail.com"
              {...register('email')}
            />
          )}
          <Input
            label="Пароль"
            type="password"
            placeholder="************"
            error={errors.password?.message}
            {...register('password')}
          />
          {!isLogin && (
            <Input
              label="Подтвердите пароль"
              type="password"
              placeholder="************"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            /> 
          )}
          <hr />
          <FormGroup>
            <Button
              type="submit"
              block
            >
              {isLogin ? 'Войти' : 'Подтвердить'}
            </Button>
          </FormGroup>
          <FormGroup>
            <VKButton block />
          </FormGroup>
        </Form>
        <hr/>
        <div className="d-flex justify-content-between">
          {isLogin ? (
            <Fragment>
              <Link href="/recovery">
                <a className="text-decoration-none flex-grow-1 text-secondary text-center">Забыли пароль?</a>
              </Link>
              <Link href="/registration">
                <a className="text-decoration-none flex-grow-1 text-secondary text-center">Регистрация</a>
              </Link>
            </Fragment>
          ) : (
            <Link href="/login">
              <a className="text-decoration-none flex-grow-1 text-secondary text-center">Войти</a>
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

