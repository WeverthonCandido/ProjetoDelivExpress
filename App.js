import React, { useState } from 'react';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('CARDAPIO');
  const [carrinho, setCarrinho] = useState([]);

  // Adiciona produto e navega direto para a tela do carrinho
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

    setTelaAtual('CARRINHO'); // Troca a tela para o carrinho ao clicar em Add
  };

  // Diminui a quantidade ou remove o item do carrinho
  const handleRemoverProduto = (idProduto) => {
    setCarrinho((itensAnteriores) => {
      return itensAnteriores
        .map((item) => {
          if (item.id === idProduto) {
            return { ...item, quantidade: item.quantidade - 1 };
          }
          return item;
        })
        .filter((item) => item.quantidade > 0);
    });
  };
