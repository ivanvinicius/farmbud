/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Column } from 'react-table';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../services/api';
import { useTableContext } from '../../../hooks/table';
import Header from '../../../components/Header';
import Table from '../../../components/Table';
import IPortfolioProps from '../../../dtos/IPortfolioProps';
import formatToStringBRL from '../../../utils/formatToStringBRL';
import ISelectOption from '../../../dtos/ISelectOption';
import Select from '../../../components/Select';

import { Container, SelectContainer } from './styles';

interface IProviderCompositionProps {
  culture_id: string;
  culture_name: string;
  productivity: number;
  provider_id: string;
  provider_name: string;
}

interface IResponseAPI {
  id: string;
  name: string;
}

interface IResponseProductivityAPI {
  productivity: string;
}

const CreateComposition1: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { setData } = useTableContext();
  const [cultures, setCultures] = useState<ISelectOption[]>([]);
  const [productivity, setProductivity] = useState<ISelectOption[]>([]);
  const [inputSelectCulture, setInputSelectCulture] = useState();
  const [inputSelectProductivity, setInputSelectProductivity] = useState();

  const handleProductivityValue = useCallback(async (data: any) => {
    setInputSelectProductivity(data);
  }, []);

  const handleFindProductivity = useCallback(async (data: any) => {
    const selectRef = formRef.current?.getFieldRef('productivity');

    selectRef.select.clearValue();

    setInputSelectCulture(data);

    const response = await api.get('/productivity', {
      params: {
        culture_id: data.value,
      },
    });

    const responseItens: Array<number> = [];

    response.data.map((item: IResponseProductivityAPI) =>
      responseItens.push(Number(item.productivity)),
    );

    const formattedProductivity: ISelectOption[] = [];

    const productivityDescription = [
      'Baixa Produtividade',
      'Média Produtividade',
      'Alta Produtividade',
    ];

    [1, 2, 3]
      .filter((item) => !responseItens.includes(item))
      .map((item) => {
        return formattedProductivity.push({
          value: String(item),
          label: productivityDescription[item - 1],
        });
      });

    setProductivity(formattedProductivity);
  }, []);

  useEffect(() => {
    api.get('/portfolios').then((response) => {
      const formattedData = response.data.map((item: IPortfolioProps) => ({
        ...item,
        price: formatToStringBRL(item.price),
        size: formatToStringBRL(item.size),
        formatted_price: `R$ ${formatToStringBRL(item.price)}`,
        formatted_size: `${formatToStringBRL(item.size)} ${item.measure_name}`,

        formatted_category: `${item.category_name.substring(0, 4)}. ${
          item.subcategory_name
        }`,

        product_composition:
          item.product_composition === null
            ? 'Não informado'
            : item.product_composition,
      }));

      setData(formattedData);
    });
  }, [setData]);

  useEffect(() => {
    api.get('/cultures').then((response) => {
      const formattedCultures: ISelectOption[] = [];

      response.data.map(({ id, name }: IResponseAPI) => {
        return formattedCultures.push({ value: id, label: name });
      });

      setCultures(formattedCultures);
    });
  }, []);

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Marca',
        accessor: 'brand_name',
      },
      {
        Header: 'Produto',
        accessor: 'product_name',
      },
      {
        Header: 'Tamanho',
        accessor: 'formatted_size',
      },
      {
        Header: 'Valor',
        accessor: 'formatted_price',
      },
      {
        Header: 'Categoria',
        accessor: 'formatted_category',
      },
      {
        Header: 'Subcategoria',
        accessor: 'subcategory_name',
      },
      {
        Header: 'Composição',
        accessor: 'product_composition',
      },

      {
        Header: 'Provider ID',
        accessor: 'provider_id',
      },
      {
        Header: 'Product ID',
        accessor: 'product_id',
      },

      {
        Header: 'Measure ID',
        accessor: 'measure_id',
      },
      {
        Header: 'Subcategory ID',
        accessor: 'subcategory_id',
      },
      {
        Header: 'Brand ID',
        accessor: 'brand_id',
      },
      {
        Header: 'Category ID',
        accessor: 'category_id',
      },
      {
        Header: 'Measure Name',
        accessor: 'measure_name',
      },
    ],
    [],
  );

  return (
    <Container>
      <Header
        urlBack="/composition"
        headerTitle="Selecione os Produtos Para a Composição"
      />

      <Form ref={formRef} onSubmit={() => ({})}>
        <SelectContainer>
          <Select
            name="culture"
            options={cultures}
            placeholder="Cultura"
            onChange={handleFindProductivity}
            noOptionsMessage={() => 'Nenhuma cultura encontrada'}
          />

          <Select
            name="productivity"
            options={productivity}
            placeholder="Produtividade"
            onChange={handleProductivityValue}
            noOptionsMessage={() => {
              return 'Todos os níveis de produtividade já foram cadastrados para a cultura selecionada.';
            }}
          />
        </SelectContainer>

        <Table
          tableHeaderColumns={headerColumns}
          hidedColumns={[
            'id',
            'provider_id',
            'product_id',
            'measure_id',
            'subcategory_id',
            'brand_id',
            'category_id',
            'measure_name',
            'category_name',
            'subcategory_name',
          ]}
          actions={{
            select: {
              pageURL: 'create-composition-step-2',
              params: {
                culture: inputSelectCulture,
                productivity: inputSelectProductivity,
              },
              buttonDisabled: !inputSelectCulture || !inputSelectProductivity,
            },
          }}
        />
      </Form>
    </Container>
  );
};

export default CreateComposition1;
