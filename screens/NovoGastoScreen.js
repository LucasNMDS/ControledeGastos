import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { TransactionContext } from '../context/TransactionContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { GASTO_CATEGORIES, RECEITA_CATEGORIES } from '../context/categorias';

export default function NovoGastoScreen({ navigation }) {
  const { addTransaction } = useContext(TransactionContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isReceita, setIsReceita] = useState(false);

  const categories = isReceita ? RECEITA_CATEGORIES : GASTO_CATEGORIES;
  const [category, setCategory] = useState(categories[0]); 

  const handleAddTransaction = () => {
    if (!description || !amount || !category) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount.replace(',', '.')),
      category,
      type: isReceita ? 'receita' : 'despesa',
      date: new Date().toISOString(),
    };
    addTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setCategory(categories[0]); 
    navigation.navigate('Histórico');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Almoço de domingo"
      />
      <CustomInput
        label="Valor (R$)"
        value={amount}
        onChangeText={setAmount}
        placeholder="Ex: 50,00"
        keyboardType="numeric"
      />

      {/* 4. Substitua o CustomInput da categoria pelo Picker */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={{ color: isReceita ? 'gray' : '#c0392b', fontWeight: !isReceita ? 'bold' : 'normal' }}>Despesa</Text>
        <Switch
          value={isReceita}
          onValueChange={(value) => {
            setIsReceita(value);
            setCategory(value ? RECEITA_CATEGORIES[0] : GASTO_CATEGORIES[0]);
          }}
          thumbColor={isReceita ? '#2ecc71' : '#f4f3f4'}
          trackColor={{ false: '#e74c3c', true: '#27ae60' }}
        />
        <Text style={{ color: isReceita ? '#27ae60' : 'gray', fontWeight: isReceita ? 'bold' : 'normal' }}>Receita</Text>
      </View>
      <CustomButton title="Adicionar Transação" onPress={handleAddTransaction} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f9f9f9' },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20, gap: 10, },
});