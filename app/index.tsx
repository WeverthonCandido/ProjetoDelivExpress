import React, { useState } from 'react';
import CardapioScreen from '../src/screens/CardapioScreen';

export default function Page() {
  const [carrinho, setCarrinho] = useState([]);

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

  return (
    <CardapioScreen
      carrinho={carrinho}
      onAdicionarProduto={handleAdicionarProduto}
    />
  );
}