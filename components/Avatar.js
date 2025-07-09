import { Image } from 'react-native';

export default function Avatar({ uri, size = 150 }) {
  const imageSource = uri ? { uri } : require('../assets/placeholder-avatar.png');

  return (
    <Image
      source={imageSource}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#ccc',
      }}
    />
  );
}