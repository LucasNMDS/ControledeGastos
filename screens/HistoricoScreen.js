import { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import GastoCard from '../components/GastoCard'; 

export default function HistoricoScreen() {
  const { transactions, loading } = useContext(TransactionContext);

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (transactions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Nenhuma transação encontrada.</Text>
        <Text>Adicione uma na aba "Novo Gasto"!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedTransactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GastoCard transaction={item} />}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});