/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint array-callback-return: 0 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Column,
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from 'react-table';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { useTableContext } from '../../hooks/table';

import GlobalInputFilter from './GlobalInputFilter';
import IndeterminateInput from './IndeterminateInput';
import ActionButton from '../ActionButton';
import Modal from '../Modal';

import {
  Container,
  TableHeader,
  PaginationButtons,
  TableContent,
  TableFooter,
  ModalContent,
} from './styles';

interface ITableProps {
  tableHeaderColumns: Column[];
  hidedColumns?: Array<string>;
  actions?: {
    select?: {
      pageURL: string;
      params?: {
        [key: string]: any;
      };
      buttonDisabled: boolean;
    };
    create?: {
      pageURL: string;
    };
    update?: {
      pageURL: string;
    };
    delete?: {
      apiURL: string;
      columnNameAccessor: Array<string> | string;
      isMultiSelect: boolean;
    };
    detail?: {
      pageURL: string;
    };
  };
}

const Table: React.FC<ITableProps> = ({
  tableHeaderColumns,
  hidedColumns,
  actions,
}) => {
  const { data, setData } = useTableContext();
  const history = useHistory();
  const [itemsToDelete, setItemsToDelete] = useState<Array<string>>([]);
  const [buttonCRUDisabled, setButtonCRUDisabled] = useState(true);
  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, globalFilter, selectedRowIds },
  } = useTable(
    {
      columns: tableHeaderColumns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: hidedColumns || [],
      },
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((allColumns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateInput
                name=""
                {...getToggleAllPageRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateInput
                name=""
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...allColumns,
      ]);
    },
  );

  const handleToggleModal = useCallback(() => {
    setModalIsOpen((state) => !state);
  }, []);

  const calculateColspan = useMemo((): number => {
    let size = 0;

    if (!hidedColumns) {
      size = tableHeaderColumns.length + 1;
    } else {
      size = tableHeaderColumns.length - hidedColumns.length + 1;
    }

    return size;
  }, [tableHeaderColumns, hidedColumns]);

  useMemo(() => {
    setButtonCRUDisabled(Object.keys(selectedRowIds).length !== 1);
  }, [selectedRowIds]);

  useMemo(() => {
    setButtonDeleteDisabled(Object.keys(selectedRowIds).length < 1);
  }, [selectedRowIds]);

  useMemo(() => {
    if (typeof actions?.delete?.columnNameAccessor === 'string') {
      const columnAccessor = String(actions?.delete?.columnNameAccessor);

      const selectedRows: Array<string> = selectedFlatRows.map(
        (row: any) => row?.original[columnAccessor],
      );

      setItemsToDelete(selectedRows);
    } else {
      const columnAcessors = actions?.delete?.columnNameAccessor;

      if (columnAcessors) {
        let cultureValue = '';
        let productivityValue = '';

        selectedFlatRows.map((row: any) => {
          cultureValue = row?.original[String(columnAcessors[0])];
          productivityValue = row?.original[String(columnAcessors[1])];

          return;
        });

        setItemsToDelete([cultureValue, productivityValue]);
      }
    }
  }, [selectedFlatRows, actions]);

  const handleActionSelect = useCallback(() => {
    if (actions?.select?.pageURL) {
      const items = selectedFlatRows.map((item) => {
        return item.original;
      });

      return history.push(`${actions.select.pageURL}`, {
        items,
        params: actions.select.params,
      });
    }

    return undefined;
  }, [history, actions, selectedFlatRows]);

  const handleActionCreate = useCallback(() => {
    return history.push(`${actions?.create?.pageURL}`, {
      item: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  const handleActionUpdate = useCallback(() => {
    return history.push(`${actions?.update?.pageURL}`, {
      item: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  const handleActionDelete = useCallback(async () => {
    try {
      if (typeof actions?.delete?.columnNameAccessor === 'string') {
        const columnAccessor = actions?.delete?.columnNameAccessor;

        if (columnAccessor) {
          const response = await api.delete(`${actions?.delete?.apiURL}`, {
            data: { ids: itemsToDelete },
          });

          if (!response) {
            throw new Error();
          }

          const dataFiltered = data.filter((item: any) => {
            return !itemsToDelete.includes(item[columnAccessor]);
          });

          setData(dataFiltered);

          toast.success('Exclusão realizada.');
        }
      } else {
        const columnAccessor = actions?.delete?.columnNameAccessor;

        if (columnAccessor) {
          const response = await api.delete(`${actions?.delete?.apiURL}`, {
            params: {
              culture_id: itemsToDelete[0],
              productivity: itemsToDelete[1],
            },
          });

          if (!response) {
            throw new Error();
          }

          const dataFiltered = data.filter((item: any) => {
            return !(
              itemsToDelete[0] === item[columnAccessor[0]] &&
              itemsToDelete[1] === item[columnAccessor[1]]
            );
          });

          setData(dataFiltered);

          toast.success('Exclusão realizada.');
        }
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error('Não há conexão com a API');

        return;
      }

      if (err instanceof Error) {
        toast.error('Houve um erro interno na aplicação');

        return;
      }

      toast.error('Ocorreu um desconhecido durante a exclusão.');
    }

    handleToggleModal();
  }, [handleToggleModal, itemsToDelete, actions, setData, data]);

  const handleActionDetail = useCallback(() => {
    return history.push(`${actions?.detail?.pageURL}`, {
      item: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  return (
    <Container>
      <Modal isOpen={modalIsOpen} onRequestClose={handleToggleModal}>
        <ModalContent>
          <span>
            Você está prestes a realizar a exclusão de registro(s), tem certeza
            que deseja continuar?
          </span>

          <div>
            <button type="button" onClick={() => handleActionDelete()}>
              Excluir
            </button>
            <button type="button" onClick={() => handleToggleModal()}>
              Cancelar
            </button>
          </div>
        </ModalContent>
      </Modal>

      <TableHeader>
        <GlobalInputFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <PaginationButtons>
          <span>{`Página ${pageIndex + 1} de ${pageOptions.length}`}</span>

          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </button>

          <button
            type="button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>

          <button
            type="button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </button>

          <button
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </PaginationButtons>
      </TableHeader>

      <TableContent
        alignTextDataToCenter={page.length === 0}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {(page.length > 0 &&
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })) || (
            <tr>
              <td colSpan={calculateColspan}>Nenhum item foi encontrado!</td>
            </tr>
          )}
        </tbody>
      </TableContent>

      <TableFooter>
        {actions?.select && (
          <ActionButton
            disabled={
              !(!actions?.select?.buttonDisabled && selectedFlatRows.length > 0)
            }
            onClick={() => handleActionSelect()}
            actionType="select"
          />
        )}

        {actions?.create && (
          <ActionButton
            disabled={buttonCRUDisabled}
            onClick={() => handleActionCreate()}
            actionType="create"
          />
        )}

        {actions?.update && (
          <ActionButton
            disabled={buttonCRUDisabled}
            onClick={() => handleActionUpdate()}
            actionType="update"
          />
        )}

        {actions?.delete && (
          <ActionButton
            disabled={
              actions.delete.isMultiSelect
                ? buttonDeleteDisabled
                : buttonCRUDisabled
            }
            onClick={() => handleToggleModal()}
            actionType="delete"
          />
        )}

        {actions?.detail && (
          <ActionButton
            disabled={buttonCRUDisabled}
            onClick={() => handleActionDetail()}
            actionType="detail"
          />
        )}
      </TableFooter>
    </Container>
  );
};

export default Table;
