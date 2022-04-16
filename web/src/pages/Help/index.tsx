/* eslint-disable */

import React from 'react';

import Header from '../../components/Header';

import { Container, HelpContainer } from './styles';

const Help: React.FC = () => {
  return (
    <Container>
      <Header urlBack="/" headerTitle="Ajuda" />

      <HelpContainer>
        <h2>Produtos</h2>
        <p>
          A aplicação conta com uma listagem padronizada de produtos, esses
          produtos podem ser adicionados ao portfólio do estabelecimento quantas
          vezes for necessário.
        </p>

        <h2>Portfólio</h2>
        <p>
          O portfólio do estabelecimento contém os produtos cadastrados anteriormente,
          prontos para uso.
        </p>

        <h2>Cadastrar Produto no Portfólio</h2>
        <p>
          Para cadastrar um produto ao portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma tabela de
          listagem, acima existe a opção <strong>Adicionar produtos ao portfólio</strong>,
          acessando a mesma, basta selecionar um produto e clicar
          em <strong>cadastrar</strong>, informe os campos faltantes no
           formulário e finalize o cadastro.
        </p>

        <h2>Alterar Produto do Portfólio</h2>
        <p>
          Para alterar um produto do portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma listagem de
          produtos, basta selecionar um dos produtos e clicar em atualizar,
          preencha os campos com as novas informações e finalize clicando
          em <strong>atualizar</strong>.
        </p>

        <h2>Deletar Produtos do Portfólio</h2>
        <p>
          Para deletar um ou mais produtos do portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma listagem de
          produtos, basta selecionar os produtos e clicar
          em <strong>excluir</strong>, confirme a ação, e os produtos serão apagados.
        </p>
        <p>
          <strong>
            OBS: Não será possível excluir produtos que
            estão em uso nas composições do estabelecimento.
          </strong>
        </p>

        <h2>Composições</h2>
        <p>
          As composições podem ser melhor entendidas como a unção de vários produtos do portfólio,
          destinadas à uma <strong>cultura</strong>, contendo um <strong>nível de produtividade</strong>. Para visualizar suas
          comsposições basta acessar a aba <strong>Composições</strong> na tela inicial da aplicação.
        </p>

        <h2>Cadastrar Composição</h2>
        <p>
          Para cadastrar uma nova composição no estabelecimento basta acessar a aba <strong>Composições</strong> na
          tela incial. Acima da listagem das compições existe a funcionalidade <strong>Adicionar composição ao estabelecimento</strong>, onde
          o próximo passo é fazer a seleção de uma <strong>cultura</strong> e <strong>nível de produtividade</strong> nos
          campos acima da listagem de produtos. Na <strong>listagem de produtos</strong> é possivel fazer a seleção dos produtos
          desejados clicando sobre os mesmos, e logo após clicando em <strong>Selecionar</strong> abaixo da listagem. O último passo
          é indicar a quantidade recomendada do uso do produto para o cultivo de 1 hectare de plantio.
        </p>
        <p>
          <strong>OBS: Quanto ao nível de produtividade, só é possível fazer o cadastro de uma composição para o nível de produtividade
            selecionado, na cultura em vigência.</strong>
        </p>

        <h2>Ver Detalhes da Composição</h2>
        <p>
          Para ver os detalhes de uma composição no estabelecimento basta acessar a aba <strong>Composições</strong> na
          tela incial. Abaixo da listagem das compições existe a funcionalidade <strong>Ver detalhes</strong> que
          fica habitada quando uma composição da listagem é marcada. Clicando na funciondalidade é possível ver os
          detalhes da composição na tela seguinte.
        </p>

        <h2>Deletar Composição</h2>
        <p>
          Para deletar uma composição no estabelecimento basta acessar a aba <strong>Composições</strong> na
          tela incial. Abaixo da listagem das compições existe a funcionalidade <strong>Excluir</strong> que
          fica habitada quando uma composição da listagem é marcada. Clicando na funciondalidade uma tela de
          confirmação aparecerá, onde é preciso confirmar a ação.
        </p>
        <p>
          <strong>
            OBS: Não será possível excluir composições utilizadas pelos agricultores.
          </strong>
        </p>

      </HelpContainer>
    </Container>
  );
};

export default Help;
