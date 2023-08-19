import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-neutral-300'>
      <Text className='text-red-400'>Hola mundo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

