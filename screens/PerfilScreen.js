import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../components/Avatar';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function PerfilScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem('profile_name');
      const savedEmail = await AsyncStorage.getItem('profile_email');
      const savedAvatar = await AsyncStorage.getItem('profile_avatar');
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedAvatar) setAvatarUri(savedAvatar);
    };
    loadProfile();
  }, []);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Você recusou o acesso à galeria de fotos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('profile_name', name);
      await AsyncStorage.setItem('profile_email', email);
      if (avatarUri) {
        await AsyncStorage.setItem('profile_avatar', avatarUri);
      }
      alert('Perfil salvo com sucesso!');
    } catch (e) {
      alert('Falha ao salvar o perfil.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Avatar uri={avatarUri} size={150} />
      </TouchableOpacity>
      <Text style={styles.avatarHelperText}>Toque na imagem para alterar</Text>

      <CustomInput label="Nome" value={name} onChangeText={setName} placeholder="Seu Nome" />
      <CustomInput label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" />
      <CustomButton title="Salvar Perfil" onPress={handleSaveProfile} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  avatarHelperText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 30,
  }
});