import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';

import { cores } from '../constants/theme';

export default function ConfirmacaoScreen({
    carrinho,
    total,
    endereco,
    numero,
    pagamento,
    numeroPedido,
    onNovoPedido,
}) {

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor={cores.primaria}
            />

            <View style={styles.content}>

                {/* Ícone de confirmação */}
                <View style={styles.checkCircle}>

                    <Text style={styles.check}>
                        ✓
                    </Text>

                </View>

                {/* Título */}
                <Text style={styles.titulo}>
                    Pedido confirmado!
                </Text>

                {/* Número do pedido */}
                <Text style={styles.numeroPedido}>
                    Pedido #{numeroPedido}
                </Text>

                {/* Linha */}
                <View style={styles.linha} />

                {/* Produtos */}
                <View style={styles.produtos}>

                    {carrinho.map((item) => (

                        <Text
                            key={item.id}
                            style={styles.produto}
                        >
                            {item.quantidade}x {item.nome}
                        </Text>

                    ))}

                </View>

                {/* Linha */}
                <View style={styles.linha} />

                {/* Total */}
                <View style={styles.infoLinha}>

                    <Text style={styles.totalLabel}>
                        Total pago
                    </Text>

                    <Text style={styles.totalValor}>
                        R$ {total.toFixed(2).replace('.', ',')}
                    </Text>

                </View>

                {/* Endereço */}
                <Text style={styles.info}>
                    Entrega: {endereco}, {numero}
                </Text>

                {/* Pagamento */}
                <Text style={styles.info}>
                    Pagamento: {pagamento}
                </Text>

                {/* Espaço */}
                <View style={styles.spacer} />

                {/* Fazer novo pedido */}
                <TouchableOpacity
                    style={styles.novoPedidoButton}
                    onPress={onNovoPedido}
                    activeOpacity={0.8}
                >

                    <Text style={styles.novoPedidoText}>
                        Fazer novo pedido
                    </Text>

                </TouchableOpacity>

                {/* Identificação */}
                <Text style={styles.tagSubtitulo}>
                    T4 • Confirmação
                </Text>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: cores.branco,
    },

    content: {
        flex: 1,
        padding: 16,
    },

    checkCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: cores.sucesso,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
    },

    check: {
        color: cores.branco,
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 30,
    },

    titulo: {
        color: cores.escura,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    numeroPedido: {
        color: '#668CFF',
        fontSize: 11,
        textAlign: 'center',
        marginTop: 4,
    },

    linha: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 10,
    },

    produtos: {
        marginBottom: 2,
    },

    produto: {
        color: cores.escura,
        fontSize: 11,
        marginBottom: 3,
    },

    infoLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },

    totalLabel: {
        color: cores.escura,
        fontSize: 11,
        fontWeight: 'bold',
    },

    totalValor: {
        color: cores.sucesso,
        fontSize: 11,
        fontWeight: 'bold',
    },

    info: {
        color: '#777777',
        fontSize: 9,
        marginBottom: 4,
    },

    spacer: {
        flex: 1,
    },

    novoPedidoButton: {
        backgroundColor: cores.sucesso,
        width: '100%',
        height: 38,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    novoPedidoText: {
        color: cores.branco,
        fontSize: 11,
        fontWeight: 'bold',
    },

    tagSubtitulo: {
        color: cores.sucesso,
        fontWeight: 'bold',
        fontSize: 11,
        marginTop: 5,
        textAlign: 'center',
    },

});