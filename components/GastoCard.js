import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GastoCard({ transaction }) {
  const isReceita = transaction.type === 'receita';
  const amountColor = isReceita ? '#2ecc71' : '#e74c3c'; 
  const iconName = isReceita ? 'arrow-up-circle' : 'arrow-down-circle';

  return (
    <View style={styles.card}>
      <Ionicons name={iconName} size={32} color={amountColor} />
      <View style={styles.info}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.category}>{transaction.category}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {isReceita ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, marginVertical: 5, marginHorizontal: 10, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  info: { flex: 1, marginLeft: 15 },
  description: { fontSize: 16, fontWeight: 'bold' },
  category: { fontSize: 12, color: 'gray' },
  amount: { fontSize: 16, fontWeight: 'bold' },
});