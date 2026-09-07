import React, { useState } from 'react';
import CardapioScreen from './src/screens/CardapioScreen';

export default function App() {
  // Tela atual ('CARDAPIO' | 'CARRINHO' | 'CHECKOUT' | 'CONFIRMACAO')
  const [telaAtual, setTelaAtual] = useState('CARDAPIO');
  
  // Estado global do carrinho
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar itens ao carrinho
  const handleAdicionarProduto = (produto) => {
    setCarrinho((itensAnteriores) => {
      const itemExistente = itensAnteriores.find((item) => item.id === produto.id);
      if (itemExistente) {
        return itensAnteriores.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...itensAnteriores, { ...produto, quantidade: 1 }];
    });
  };

  // Renderização condicional das telas conforme evoluirmos no projeto
  return (
    <>
      {telaAtual === 'CARDAPIO' && (
        <CardapioScreen
          carrinho={carrinho}
          onAdicionarProduto={handleAdicionarProduto}
        />
      )}
      {/* Próximas aulas: CarrinhoScreen, CheckoutScreen, ConfirmacaoScreen */}
    </>
  );
}