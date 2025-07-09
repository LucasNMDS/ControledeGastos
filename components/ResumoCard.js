import { View, Text, StyleSheet } from 'react-native';

export default function ResumoCard({ title, value, valueColor, style, titleStyle }) {
  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.cardValue, { color: valueColor }]}>
        R$ {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: 'gray',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
});