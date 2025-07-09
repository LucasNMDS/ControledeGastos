import { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTIONS_KEY = '@MyFinanceApp:transactions';

export const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(TRANSACTIONS_KEY);
        const savedTransactions = jsonValue != null ? JSON.parse(jsonValue) : [];
        setTransactions(savedTransactions);
      } catch (e) {
        console.error("Failed to load transactions.", e);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const newTransactions = [...transactions, transaction];
      setTransactions(newTransactions);
      const jsonValue = JSON.stringify(newTransactions);
      await AsyncStorage.setItem(TRANSACTIONS_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save transaction.", e);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};