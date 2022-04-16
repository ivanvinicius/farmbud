import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { SiGumtree } from 'react-icons/si';
import { FiMail, FiLock } from 'react-icons/fi';

import getValidationErrors from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Card } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async ({ email, password }: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Informe o email.'),
          password: Yup.string().min(6, 'No mínimo 6 digitos.'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        await signIn({ email, password });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.message === 'Network Error') {
          toast.error('Não há conexão com a API');

          return;
        }

        toast.error('Cheque suas credenciais');
      }
    },
    [signIn, history],
  );

  return (
    <Container>
      <Card>
        <div>
          <h1>Fa</h1>
          <SiGumtree />
          <h1>m Bud</h1>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type="email" name="email" icon={FiMail} placeholder="Email" />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/signup">Criar Conta</Link>
      </Card>
    </Container>
  );
};

export default SignIn;
