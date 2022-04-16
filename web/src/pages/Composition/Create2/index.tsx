/* eslint-disable array-callback-return */

import React, { useCallback, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Header from '../../../components/Header';
import NumericInput from '../../../components/NumericInput';
import Button from '../../../components/Button';

import ISelectOption from '../../../dtos/ISelectOption';
import IPortfolioProps from '../../../dtos/IPortfolioProps';
import formatToNumeric from '../../../utils/formatToNumeric';

import {
  FormContent,
  ItemOfList,
  ItemInfo,
  InputBlock,
  RecommendationArea,
} from './styles';

interface ILocationProps {
  items: IPortfolioProps[];
  params: {
    culture: ISelectOption;
    productivity: ISelectOption;
  };
}

interface ISubmitDataProps {
  [key: string]: string;
}

const CreateComposition2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { items, params } = useLocation().state as ILocationProps;

  const handleSubmit = useCallback(
    async (data: ISubmitDataProps) => {
      try {
        const inputValues: Array<[string, string]> = Object.entries(data);
        let hasError = false;

        inputValues.map((item: Array<string>) => {
          if (!item[1] || item[1] === undefined || item[1] === '0') {
            formRef.current?.setFieldError(item[0], 'ss');
            hasError = true;

            return;
          }

          formRef.current?.setErrors({});
          hasError = false;

          return;
        });

        if (hasError) {
          throw new Error();
        } else {
          const formattedItems = inputValues.map((item: Array<string>) => ({
            parent_id: item[0],
            recommendation: formatToNumeric(item[1]),
          }));

          await api.post('/providers-compositions', {
            culture_id: String(params.culture.value),
            productivity: Number(params.productivity.value),
            items: formattedItems,
          });

          toast.success('Cadastro realizado.');

          history.push('/composition');
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error('Todos os campos devem ser preenchidos');

          return;
        }

        if (err.message === 'Network Error') {
          toast.error('Não há conexão com a API');

          return;
        }

        toast.error('Não foi possível realizar o cadastro.');
      }
    },
    [params, history],
  );

  return (
    <>
      <Header
        urlBack="/create-composition-step-1"
        headerTitle="Finalizar Cadastro de Composição"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContent>
          {items.map(
            ({
              id,
              product_name,
              formatted_size,
              formatted_price,
              measure_name,
            }: IPortfolioProps) => (
              <ItemOfList key={id}>
                <ItemInfo>
                  <div>
                    <strong>{`${product_name}  `}</strong>
                    <p>{formatted_size}</p>
                  </div>

                  <p>{formatted_price}</p>
                </ItemInfo>

                <RecommendationArea>
                  <InputBlock>
                    <NumericInput
                      name={String(id)}
                      placeholder="0,00"
                      decimalSeparator=","
                      groupSeparator="."
                      allowDecimals
                      decimalsLimit={2}
                    />
                  </InputBlock>
                  <p>{`${measure_name}(s) em 1 hectere`}</p>
                </RecommendationArea>
              </ItemOfList>
            ),
          )}
          <Button type="submit">Cadastrar</Button>
        </FormContent>
      </Form>
    </>
  );
};

export default CreateComposition2;
