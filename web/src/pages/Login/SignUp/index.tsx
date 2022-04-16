/* eslint @typescript-eslint/no-explicit-any: 0 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { RiBuilding2Line } from 'react-icons/ri';
import { FiMail, FiLock } from 'react-icons/fi';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

import { Container, Card, AddressGroup } from './styles';

import ISelectOption from '../../../dtos/ISelectOption';

interface IResponseAPI {
  id: string;
  parent_id: string;
  name: string;
}

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [states, setStates] = useState<ISelectOption[]>();
  const [cities, setCities] = useState<ISelectOption[]>();

  useEffect(() => {
    api.get('/states').then((response) => {
      const formattedStates: ISelectOption[] = [];

      response.data.map(({ id, name }: IResponseAPI) => {
        return formattedStates.push({ value: id, label: name });
      });

      setStates(formattedStates);
    });
  }, []);

  const handleFindCityByState = useCallback(async (data: any) => {
    const selectRef = formRef.current?.getFieldRef('city');

    selectRef.select.clearValue();

    if (!data) {
      setCities([]);
    }

    const { value } = data;
    const formattedCities: ISelectOption[] = [];

    const response = await api.get('/cities', {
      params: {
        state_id: value,
      },
    });

    response.data.map(({ id, name }: IResponseAPI) => {
      return formattedCities.push({ value: id, label: name });
    });

    setCities(formattedCities);
  }, []);

  const handleSubmitForm = useCallback(
    async ({ name, email, password, state, city }: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Informe o nome.'),
          email: Yup.string().email().required('Informe o email'),
          password: Yup.string().min(6, 'No mínimo 6 digitos.'),
          state: Yup.string().required('Informe o estado.'),
          city: Yup.string().required('Informe a cidade.'),
        });

        await schema.validate(
          { name, email, password, state, city },
          { abortEarly: false },
        );

        await api.post('/providers', {
          address_id: city,
          name,
          email,
          password,
        });

        toast.success('Cadastro realizado.');

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formattedErrors = getValidationErrors(err);

          formRef.current?.setErrors(formattedErrors);

          return;
        }

        if (err.message === 'Network Error') {
          toast.error('Não há conexão com a API');

          return;
        }

        toast.error('Não foi possível realizar o cadastro.');
      }
    },
    [history],
  );

  return (
    <Container>
      <Card>
        <h2>Fazer Cadastro</h2>

        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <Input
            type="text"
            icon={RiBuilding2Line}
            name="name"
            placeholder="Nome da Empresa"
          />
          <Input type="email" icon={FiMail} name="email" placeholder="Email" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />

          <AddressGroup>
            <Select
              name="state"
              options={states}
              placeholder="Estado"
              onChange={handleFindCityByState}
              noOptionsMessage={() => 'Não foi encontrado UF'}
            />

            <Select
              name="city"
              options={cities}
              placeholder="Cidade"
              noOptionsMessage={() => 'Primeiro selecione o UF'}
            />
          </AddressGroup>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/signin">Voltar ao Login</Link>
      </Card>
    </Container>
  );
};

export default SignUp;
