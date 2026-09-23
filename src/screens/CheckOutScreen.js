import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
    ScrollView,
} from 'react-native';

import { cores } from '../constants/theme';

export default function CheckOutScreen({ onVoltar }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [complemento, setCompl] = useState('');
    const [numero, setNumber] = useState('');
    const [endereço, setEndereco] = useState('');
    const [referencia, setReferencia] = useState('');
    const [cep, setCep] = useState('');
    const [pagamento, setPagamento] = useState('Cartão');
    const [mostrarOpcoesPagamento, setMostrarOpcoesPagamento] =
        useState(false);

    const pagamentos = [
        'Cartão',
        'Pix',
        'Dinheiro',
    ];

    // Máscara simples de telefone
    const handleTelefone = (texto) => {
        const numeros = texto.replace(/\D/g, '');

        let formatado = numeros;

        if (numeros.length <= 10) {
            formatado = numeros
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            formatado = numeros
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }

        setTelefone(formatado);
    };

    // Mantém somente os números do CEP
    const handleCep = (texto) => {
        const numeros = texto.replace(/\D/g, '').slice(0, 8);
        setCep(numeros);
    };

    const cepValido = cep.length === 8;
    const finalizarPedido = () => {
        if (!nome.trim()) {
            Alert.alert(
                'Dados incompletos',
                'Digite seu nome.'
            );
            return;
        }

        if (!telefone.trim()) {
            Alert.alert(
                'Dados incompletos',
                'Digite seu telefone.'
            );
            return;
        }

        if (!cepValido) {
            Alert.alert(
                'CEP inválido',
                'O CEP deve ter 8 dígitos.'
            );
            return;
        }

        Alert.alert(
            'Pedido finalizado!',
            `Obrigado, ${nome}. Seu pedido foi recebido.`
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={cores.primaria}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Botão voltar */}
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={onVoltar}
                    activeOpacity={0.8}
                >
                    <Text style={styles.headerButtonText}>
                        ← Dados de Entrega
                    </Text>
                </TouchableOpacity>

                {/* Nome */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Nome
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Maria Silva"
                        placeholderTextColor={cores.secundaria}
                        autoCapitalize="words"
                    />
                </View>

                {/* Telefone */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Telefone
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={telefone}
                        onChangeText={handleTelefone}
                        placeholder="(19) 9____-____"
                        placeholderTextColor="#8A8F98"
                        keyboardType="phone-pad"
                        maxLength={15}
                    />
                </View>

               {/* Endereço */}                
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Endereço
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={endereço}
                        placeholder="Endereço"
                        placeholderTextColor="#8A8F98"
                        maxLength={15}
                    />
                </View>
                
               {/* Número */}                
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Número
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={numero}
                        placeholder="Ex: 111"
                        placeholderTextColor="#8A8F98"
                        maxLength={15}
                    />
                </View>
               {/* Complemento*/}                
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Complemento
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={complemento}
                        placeholder="Opicional"
                        placeholderTextColor="#8A8F98"
                        maxLength={15}
                    />
                </View>
               {/* Referencia*/}                
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Referência
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={referencia}
                        placeholder="Opicional"
                        placeholderTextColor="#8A8F98"
                        maxLength={15}
                    />
                </View>

                {/* CEP */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        CEP
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            !cepValido && cep.length > 0
                                ? styles.inputErro
                                : null,
                        ]}
                        value={cep}
                        onChangeText={handleCep}
                        placeholder="1301"
                        placeholderTextColor={cores.secundaria}
                        keyboardType="numeric"
                        maxLength={8}
                    />

                    {/* Mensagem de erro */}
                    {!cepValido && cep.length > 0 && (
                        <Text style={styles.errorText}>
                            ⚠ CEP deve ter 8 dígitos.
                        </Text>
                    )}
                </View>

                {/* Pagamento */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                        Pagamento
                    </Text>

                    <TouchableOpacity
                        style={styles.select}
                        onPress={() =>
                            setMostrarOpcoesPagamento(
                                !mostrarOpcoesPagamento
                            )
                        }
                        activeOpacity={0.8}
                    >
                        <Text style={styles.selectText}>
                            {pagamento}
                        </Text>

                        <Text style={styles.arrow}>
                            ▼
                        </Text>
                    </TouchableOpacity>

                    {mostrarOpcoesPagamento && (
                        <View style={styles.optionsContainer}>
                            {pagamentos.map((opcao) => (
                                <TouchableOpacity
                                    key={opcao}
                                    style={styles.option}
                                    onPress={() => {
                                        setPagamento(opcao);
                                        setMostrarOpcoesPagamento(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>
                                        {opcao}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Espaço flexível antes do botão */}
                <View style={styles.spacer} />

                {/* Finalizar pedido */}
                <TouchableOpacity
                    style={styles.finalizarButton}
                    onPress={finalizarPedido}
                    activeOpacity={0.8}
                >
                    <Text style={styles.finalizarButtonText}>
                        Finalizar pedido
                    </Text>
                </TouchableOpacity>

                {/* Identificação da tela */}
                <Text style={styles.tagSubtitulo}>
                    T3 • Checkout
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.branco,
    },

    scrollContent: {
        flexGrow: 1,
        padding: 16,
    },

    headerButton: {
        backgroundColor: cores.primaria,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignSelf: 'flex',
        marginBottom: 14,
    },

    headerButtonText: {
        color: cores.branco,
        fontSize: 15,
        fontWeight: 'bold',
    },

    fieldContainer: {
        marginBottom: 10,
    },

    label: {
        color: cores.escura,
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 4,
        marginLeft: 5,
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#C9CED6',
        borderRadius: 8,
        backgroundColor: cores.branco,
        paddingHorizontal: 9,
        fontSize: 13,
        color: cores.escura,
    },

    inputErro: {
        borderColor: cores.erro,
        backgroundColor: '#FFF0F0',
    },

    errorText: {
        color: cores.erro,
        fontSize: 11,
        marginTop: 3,
        marginLeft: 5,
    },

    select: {
        height: 40,
        borderWidth: 1,
        borderColor: '#C9CED6',
        borderRadius: 8,
        backgroundColor: cores.branco,
        paddingHorizontal: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    selectText: {
        color: cores.escura,
        fontSize: 13,
    },

    arrow: {
        color: cores.primaria,
        fontSize: 10,
    },

    optionsContainer: {
        borderWidth: 1,
        borderColor: '#C9CED6',
        borderRadius: 8,
        marginTop: 4,
        backgroundColor: cores.branco,
        overflow: 'hidden',
    },

    option: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    optionText: {
        fontSize: 13,
        color: cores.escura,
    },

    spacer: {
        flex: 1,
        minHeight: 80,
    },

    finalizarButton: {
        backgroundColor: cores.primaria,
        width: '100%',
        height: 44,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    finalizarButtonText: {
        color: cores.branco,
        fontSize: 15,
        fontWeight: 'bold',
    },

    tagSubtitulo: {
        color: cores.primaria,
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 5,
        textAlign: 'center',
    },
});
