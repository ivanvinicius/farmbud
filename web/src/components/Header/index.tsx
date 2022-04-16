import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPower, FiHelpCircle } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import Modal from '../Modal';

import {
  ModalContent,
  Container,
  HeaderContent,
  BackLinkArea,
  Title,
  SignOutArea,
} from './styles';

interface IHeaderProps {
  urlBack?: string;
  headerTitle?: string;
}

const Header: React.FC<IHeaderProps> = ({
  urlBack = '/',
  headerTitle = '',
}) => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setModalIsOpen((state) => !state);
  }, []);

  const handleSignOut = useCallback(async () => {
    signOut();

    history.push('/signin');
  }, [signOut, history]);

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={handleToggleModal}>
        <ModalContent>
          <span>Você tem certeza que deseja sair?</span>

          <div>
            <button type="submit" onClick={handleSignOut}>
              Sim, sair
            </button>
            <button type="submit" onClick={handleToggleModal}>
              Não, voltar a aplicação
            </button>
          </div>
        </ModalContent>
      </Modal>

      <Container>
        <HeaderContent>
          <BackLinkArea>
            <Link to={urlBack}>
              <FiArrowLeft size={22} />
              Voltar
            </Link>
          </BackLinkArea>

          {headerTitle.length > 0 ? (
            <Title>{headerTitle}</Title>
          ) : (
            <Title>{user.name}</Title>
          )}

          <SignOutArea>
            <Link to="help">
              <FiHelpCircle size={22} />
              Ajuda
            </Link>

            <button type="button" onClick={handleToggleModal}>
              <FiPower size={20} />
              Sair
            </button>
          </SignOutArea>
        </HeaderContent>
      </Container>
    </>
  );
};

export default Header;
