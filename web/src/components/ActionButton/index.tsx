import React, { useMemo, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: 'select' | 'create' | 'update' | 'delete' | 'detail';
}

const ActionButton: React.FC<IActionButton> = ({ actionType, ...rest }) => {
  const buttonDescription = useMemo(
    () => ({
      select: 'Selecionar',
      create: 'Cadastrar',
      update: 'Atualizar',
      delete: 'Excluir',
      detail: 'Ver Detalhes',
    }),
    [],
  );

  return (
    <Container type="button" {...rest}>
      {buttonDescription[actionType]}
    </Container>
  );
};

export default ActionButton;
