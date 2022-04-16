import React, { useEffect, useMemo } from 'react';
import { Column } from 'react-table';

import api from '../../../services/api';
import { useTableContext } from '../../../hooks/table';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IProductsProps from '../../../dtos/IProductsProps';

import { Container } from './styles';

const ListProducts: React.FC = () => {
  const { setData } = useTableContext();

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Marca',
        accessor: 'brand_name',
      },
      {
        Header: 'Produto',
        accessor: 'name',
      },
      {
        Header: 'Categoria',
        accessor: 'formatted_category',
      },
      {
        Header: 'Composição',
        accessor: 'composition',
      },

      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'ID Marca',
        accessor: 'brand_id',
      },
      {
        Header: 'ID Categoria',
        accessor: 'category_id',
      },
      {
        Header: 'ID Subcategoria',
        accessor: 'subcategory_id',
      },
      {
        Header: 'Subcategoria',
        accessor: 'subcategory_name',
      },
    ],
    [],
  );

  useEffect(() => {
    api.get('products').then((response) => {
      const formattedProducts = response.data.map((item: IProductsProps) => ({
        ...item,
        composition: !item.composition ? 'Não informado' : item.composition,
        formatted_category: `${item.category_name.substring(0, 4)}. ${
          item.subcategory_name
        }`,
      }));

      setData(formattedProducts);
    });
  }, [setData]);

  return (
    <Container>
      <Header
        urlBack="/portfolio"
        headerTitle="Listagem Padronizada de Produtos"
      />

      <Table
        tableHeaderColumns={headerColumns}
        hidedColumns={[
          'id',
          'brand_id',
          'category_id',
          'subcategory_id',
          'category_name',
          'subcategory_name',
        ]}
        actions={{ create: { pageURL: '/create-portfolio' } }}
      />
    </Container>
  );
};

export default ListProducts;
