import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { Button, Input } from '../../components';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas não são iguais',
          ),
        });
        await schema.validate(data, { abortEarly: false });
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) {
          throw new Error();
        }
        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });
        history.push('/');

        addToast({ title: `Bem vindo` });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao redefinir senha',
          description:
            'Ocorreu um erro ao redefinir sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Go Barber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Redefinir senha</h1>
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação de senha"
          />
          <Button name="submit" type="submit">
            Redefinir
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
