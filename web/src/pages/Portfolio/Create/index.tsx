import React, { useRef, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import formatToNumeric from '../../../utils/formatToNumeric';
import getValidationErrors from '../../../utils/getValidationErrors';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import NumericInput from '../../../components/NumericInput';
import { useMeasureContext } from '../../../hooks/measure';
import IProductProps from '../../../dtos/IProductsProps';

import { Container, Content, InfoRow, CategoryRow, VolumeRow } from './styles';

interface ILocationProps {
  item: IProductProps;
}

interface IFormSubmitProps {
  measure: string;
  size: string;
  price: string;
}

const CreateProductMeasure: React.FC = () => {
  const { item } = useLocation().state as ILocationProps;
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { measures, getMeasures } = useMeasureContext();

  useEffect(() => getMeasures(), [getMeasures]);

  const handleFormSubmit = useCallback(
    async ({ measure, size, price }: IFormSubmitProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          size: Yup.string().required('Informe o tamanho.'),
          measure: Yup.string().required('Informe a unidade de medida.'),
          price: Yup.string().required('Informe o valor'),
        });

        await schema.validate({ measure, size, price }, { abortEarly: false });

        const formattedData = {
          product_id: item.id,
          measure_id: measure,
          price: formatToNumeric(price),
          size: formatToNumeric(size),
        };

        await api.post('/portfolios', formattedData);

        toast.success('Cadastro realizado.');

        history.push('/products');
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
    [history, item],
  );

  return (
    <Container>
      <Header
        urlBack="/products"
        headerTitle="Finalizar Cadastro do Produto no Portfólio"
      />

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: item.name,
            brand: item.brand_name,
            category: item.category_name,
            subcategory: item.subcategory_name,
            composition: item.composition,
          }}
          onSubmit={handleFormSubmit}
        >
          <InfoRow>
            <div>
              <label>Nome</label>
              <Input name="name" disabled placeholder="Nome do produto" />
            </div>
            <div>
              <label>Marca</label>
              <Input name="brand" disabled placeholder="Marca" />
            </div>
          </InfoRow>
          <CategoryRow>
            <div>
              <label>Categoria</label>
              <Input name="category" disabled placeholder="Categoria" />
            </div>

            <div>
              <label>Subcategoria</label>
              <Input name="subcategory" disabled placeholder="Subcategoria" />
            </div>

            <div>
              <label>Composição</label>
              <Input name="composition" disabled placeholder="Composição" />
            </div>
          </CategoryRow>
          <VolumeRow>
            <div>
              <label>Tamanho</label>
              <NumericInput
                name="size"
                placeholder="50,00"
                decimalSeparator=","
                groupSeparator="."
                allowDecimals
                decimalsLimit={2}
              />
            </div>

            <div>
              <label>Unidade de medida</label>
              <Select name="measure" options={measures} />
            </div>
            <div>
              <label>Valor</label>
              <NumericInput
                name="price"
                placeholder="R$ 10,00"
                prefix="R$ "
                decimalSeparator=","
                groupSeparator="."
                allowDecimals
                decimalsLimit={2}
              />
            </div>
          </VolumeRow>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateProductMeasure;
