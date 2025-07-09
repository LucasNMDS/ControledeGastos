import { useContext } from 'react';
import { Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import { PieChart } from 'react-native-chart-kit';
import ResumoCard from '../components/ResumoCard';

export default function ResumoScreen() {
  const { transactions } = useContext(TransactionContext);

  const { receitas, despesas, despesasPorCategoria } = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'receita') {
        acc.receitas += curr.amount;
      } else {
        acc.despesas += curr.amount;
        acc.despesasPorCategoria[curr.category] = (acc.despesasPorCategoria[curr.category] || 0) + curr.amount;
      }
      return acc;
    },
    { receitas: 0, despesas: 0, despesasPorCategoria: {} }
  );

  const saldo = receitas - despesas;
  const saldoColor = saldo >= 0 ? '#2ecc71' : '#e74c3c';

  const chartData = despesas > 0 ? Object.keys(despesasPorCategoria).map((key, index) => {
      const percentage = (despesasPorCategoria[key] / despesas) * 100;
      return {
        name: `${key} (${percentage.toFixed(1)}%)`,
        population: despesasPorCategoria[key],
        color: ['#e74c3c', '#3498db', '#9b59b6', '#f1c40f', '#e67e22'][index % 5],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    }) : [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumo Financeiro</Text>
      
      <ResumoCard
        title="Receitas"
        value={receitas.toFixed(2)}
        valueColor="#2ecc71"
      />
      <ResumoCard
        title="Despesas"
        value={despesas.toFixed(2)}
        valueColor="#e74c3c"
      />
      <ResumoCard
        title="Saldo Final"
        value={saldo.toFixed(2)}
        valueColor="white"
        style={{ backgroundColor: saldoColor }}
        titleStyle={{ color: 'white' }}
      />

      {chartData.length > 0 && (
        <>
          <Text style={styles.title}>Despesas por Categoria</Text>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 15, textAlign: 'center' },
});