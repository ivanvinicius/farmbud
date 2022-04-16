import React, { useEffect, useMemo } from 'react';
import { Column } from 'react-table';
import { Link } from 'react-router-dom';

import api from '../../../services/api';
import { useTableContext } from '../../../hooks/table';
import Header from '../../../components/Header';
import Table from '../../../components/Table';

import { Container, AddProductsContainer } from './styles';

interface IProviderCompositionProps {
  culture_id: string;
  culture_name: string;
  productivity: number;
  provider_id: string;
  provider_name: string;
}

const ListComposition: React.FC = () => {
  const { setData } = useTableContext();

  useEffect(() => {
    api.get('/providers-compositions').then((response) => {
      const productivityInfo = [
        'Produtividade Baixa',
        'Produtividade Média',
        'Produtividade Alta',
      ];

      const formattedData = response.data.map(
        (item: IProviderCompositionProps) => ({
          ...item,
          productivity_description: productivityInfo[item.productivity - 1],
        }),
      );

      setData(formattedData);
    });
  }, [setData]);

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Estabelecimento ID',
        accessor: 'provider_id',
      },
      {
        Header: 'Estabelecimento',
        accessor: 'provider_name',
      },
      {
        Header: 'Cultura ID',
        accessor: 'culture_id',
      },
      {
        Header: 'Cultura',
        accessor: 'culture_name',
      },
      {
        Header: 'Produtividade ID',
        accessor: 'productivity',
      },
      {
        Header: 'Nível de Produtividade',
        accessor: 'productivity_description',
      },
    ],
    [],
  );

  return (
    <Container>
      <Header
        urlBack="/"
        headerTitle="Composições de Produtos Estabelecimento"
      />

      <AddProductsContainer>
        <strong>Adicionar composição de produtos ao estabelecimento</strong>
        <Link to="/create-composition-step-1">Adicionar</Link>
      </AddProductsContainer>

      <Table
        tableHeaderColumns={headerColumns}
        hidedColumns={[
          'provider_id',
          'provider_name',
          'culture_id',
          'productivity',
        ]}
        actions={{
          detail: {
            pageURL: 'composition-detail',
          },
          delete: {
            apiURL: 'providers-compositions',
            columnNameAccessor: ['culture_id', 'productivity'],
            isMultiSelect: false,
          },
        }}
      />
    </Container>
  );
};

export default ListComposition;
