import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { Button, Input } from '../../components';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const [waitingRequest, setWaitingRequest] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setWaitingRequest(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn(data);
        setWaitingRequest(false);
        history.push('/dashboard');
        addToast({ title: `Bem vindo` });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no login',
          description:
            'Ocorreu um erro ao efetuar o login, verifique suas credenciais',
        });
        setWaitingRequest(false);
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Go Barber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button name="submit" type="submit">
            {waitingRequest ? 'Buscando usuário...' : 'Entrar'}
          </Button>
          <Link to="forgot-password">Esqueci minha senha</Link>
        </Form>
        <Link to="/signup">
          <FiLogIn /> Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
