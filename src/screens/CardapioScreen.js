import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, // 1. Import do TextInput
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { cores } from '../constants/theme';
import { PRODUTOS } from '../mock/produtos';

export default function CardapioScreen({ carrinho, onAdicionarProduto }) {
  // Estado para armazenar o texto digitado na busca (RF05)
  const [busca, setBusca] = useState('');

  // Contador total de itens no carrinho (RF03)
  const totalItensCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // Filtra os produtos com base no texto digitado (ignora maiúsculas/minúsculas)
  const produtosFiltrados = PRODUTOS.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.primaria} />
      
      {/* Topo / Header com contador */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DelivExpress</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{totalItensCarrinho}</Text>
        </View>
      </View>

      {/* Campo de Busca / Search Bar (RF05) */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar termos..."
          placeholderTextColor={cores.secundaria}
          value={busca}
          onChangeText={setBusca}
          clearButtonMode="while-editing" // Botão 'X' para limpar no iOS
        />
      </View>

      {/* Lista de Produtos (Filtrados) */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <View key={produto.id} style={styles.card}>
              
              {/* Quadrado colorido */}
              <View style={[styles.cardColorBox, { backgroundColor: produto.cor }]} />
              
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{produto.nome}</Text>
                <Text style={styles.cardDescription}>{produto.descricao}</Text>
                <Text style={styles.cardPrice}>
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAdicionarProduto(produto)}
                activeOpacity={0.7}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          /* Mensagem caso não encontre nenhum produto */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoClaro,
  },
  header: {
    height: 60,
    backgroundColor: cores.primaria,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },
  badgeContainer: {
    backgroundColor: cores.sucesso,
    borderRadius: 12,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Estilos do campo de busca
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchInput: {
    backgroundColor: cores.branco,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: cores.escura,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  cardColorBox: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },
  cardDescription: {
    fontSize: 14,
    color: cores.secundaria,
    marginVertical: 2,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.erro,
  },
  addButton: {
    backgroundColor: cores.sucesso,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: cores.secundaria,
    fontSize: 14,
  },
});