import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { TransactionProvider } from './context/TransactionContext';

import ResumoScreen from './screens/ResumoScreen';
import NovoGastoScreen from './screens/NovoGastoScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PerfilScreen from './screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Resumo') iconName = focused ? 'pie-chart' : 'pie-chart-outline';
              else if (route.name === 'Novo Gasto') iconName = focused ? 'add-circle' : 'add-circle-outline';
              else if (route.name === 'Histórico') iconName = focused ? 'list' : 'list-outline';
              else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: '#f2f2f2' },
          })}
        >
          <Tab.Screen name="Resumo" component={ResumoScreen} />
          <Tab.Screen name="Novo Gasto" component={NovoGastoScreen} />
          <Tab.Screen name="Histórico" component={HistoricoScreen} />
          <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}