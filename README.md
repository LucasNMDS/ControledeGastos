# ControledeGastos
Um aplicativo móvel multiplataforma, desenvolvido com React Native (Expo), para ajudar usuários a gerenciar suas finanças pessoais de forma simples e intuitiva. Este projeto foi criado para demonstrar habilidades em desenvolvimento mobile, incluindo navegação entre telas, gerenciamento de estado global, componentização, estilização dinâmica e persistência de dados no dispositivo.

Dashboard de Resumo: Visualização clara do total de receitas, despesas e do saldo final, com cores dinâmicas que refletem a saúde financeira.
Gráfico de Pizza: Um gráfico interativo na tela de resumo que mostra a distribuição percentual dos gastos por categoria.
Registro de Transações: Formulário para adicionar novos ganhos ou perdas, permitindo uma catalogação precisa de cada movimentação financeira.
Categorias Pré-definidas: Seletores com categorias padronizadas para receitas e despesas, garantindo a consistência dos dados e facilitando a análise.
Histórico Detalhado: Listagem completa de todas as transações, ordenadas da mais recente para a mais antiga, com identificação visual para receitas (verde) e despesas (vermelho).
Perfil Personalizável: Tela de perfil onde o usuário pode salvar seu nome, e-mail e escolher um avatar personalizado diretamente da galeria do seu dispositivo.
Persistência de Dados: Todas as transações e informações do perfil são salvas localmente no dispositivo utilizando AsyncStorage, garantindo que os dados não se percam ao fechar o aplicativo.
Componentização: O projeto foi estruturado com foco na reutilização de componentes, como botões, inputs, cards e avatares, seguindo as melhores práticas do React.

# Tecnologias Utilizadas
Framework: React Native (com Expo)
Linguagem: JavaScript (ES6+)
Navegação: React Navigation (BottomTabNavigator)
Gerenciamento de Estado: React Context API
Gráficos: react-native-chart-kit
Componentes de UI: @react-native-picker/picker para seletores
APIs do Dispositivo: expo-image-picker para acesso à galeria
Persistência Local: @react-native-async-storage/async-storage

#Estrutura de Pastas
O projeto foi organizado da seguinte forma para garantir escalabilidade e manutenibilidade:

assets/               # Imagens estáticas (ícones, placeholder de avatar)
components/           # Componentes reutilizáveis (Botão, Card, Input, etc.)
constants/            # Constantes globais (listas de categorias)
context/              # Context API para gerenciamento de estado (TransactionContext)
screens/              # As 4 telas principais do app (Resumo, NovoGasto, etc.)
App.js                # Ponto de entrada principal e configuração da navegação
