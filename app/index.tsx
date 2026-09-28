import React, { useState } from 'react';

import CardapioScreen from '../src/screens/CardapioScreen';
import CarrinhoScreen from '../src/screens/CarrinhoScreen';
import CheckOutScreen from '../src/screens/CheckOutScreen';
import ConfirmacaoScreen from '../src/screens/ConfirmacaoScreen';

export default function Page() {

  const [carrinho, setCarrinho] = useState<any[]>([]);

  const [telaAtual, setTelaAtual] =
    useState<
      'CARDAPIO' | 'CARRINHO' | 'CHECKOUT' | 'CONFIRMACAO'
    >('CARDAPIO');

  // Dados do pedido
  const [dadosPedido, setDadosPedido] = useState({
    endereco: '',
    numero: '',
    pagamento: 'Cartão',
  });

  // Número do pedido
  const [numeroPedido, setNumeroPedido] = useState('4821');

  // Adicionar produto ao carrinho
  const handleAdicionarProduto = (produto: any) => {

    setCarrinho((itensAnteriores) => {

      const itemExistente = itensAnteriores.find(
        (item) => item.id === produto.id
      );

      if (itemExistente) {

        return itensAnteriores.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );

      }

      return [
        ...itensAnteriores,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });

    setTelaAtual('CARRINHO');
  };

  // Remover produto
  const handleRemoverProduto = (idProduto: any) => {

    setCarrinho((itensAnteriores) =>
      itensAnteriores
        .map((item) =>
          item.id === idProduto
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // Finalizar checkout
  const handleFinalizarPedido = (dados: {
    endereco: string;
    numero: string;
    pagamento: string;
  }) => {

    setDadosPedido(dados);

    // Gera um número simples para o pedido
    const novoNumero =
      Math.floor(1000 + Math.random() * 9000);

    setNumeroPedido(String(novoNumero));

    setTelaAtual('CONFIRMACAO');
  };

  // Fazer novo pedido
  const handleNovoPedido = () => {

    setCarrinho([]);

    setDadosPedido({
      endereco: '',
      numero: '',
      pagamento: 'Cartão',
    });

    setTelaAtual('CARDAPIO');
  };

  // Calcula o total
  const subtotal = carrinho.reduce(
    (acc, item) =>
      acc + item.preco * item.quantidade,
    0
  );

  const taxaEntrega = carrinho.length > 0 ? 6 : 0;

  const total = subtotal + taxaEntrega;

  return (
    <>

      {/* T1 - CARDÁPIO */}
      {telaAtual === 'CARDAPIO' && (
        <CardapioScreen
          carrinho={carrinho}
          onAdicionarProduto={handleAdicionarProduto}
        />
      )}

      {/* T2 - CARRINHO */}
      {telaAtual === 'CARRINHO' && (
        <CarrinhoScreen
          carrinho={carrinho}
          onAdicionar={handleAdicionarProduto}
          onRemover={handleRemoverProduto}
          onVoltar={() => setTelaAtual('CARDAPIO')}
          onContinuar={() => setTelaAtual('CHECKOUT')}
        />
      )}

      {/* T3 - CHECKOUT */}
      {telaAtual === 'CHECKOUT' && (
        <CheckOutScreen
          onVoltar={() => setTelaAtual('CARRINHO')}
          onFinalizar={handleFinalizarPedido}
        />
      )}

      {/* T4 - CONFIRMAÇÃO */}
      {telaAtual === 'CONFIRMACAO' && (
        <ConfirmacaoScreen
          carrinho={carrinho}
          total={total}
          endereco={dadosPedido.endereco}
          numero={dadosPedido.numero}
          pagamento={dadosPedido.pagamento}
          numeroPedido={numeroPedido}
          onNovoPedido={handleNovoPedido}
        />
      )}

    </>
  );
}