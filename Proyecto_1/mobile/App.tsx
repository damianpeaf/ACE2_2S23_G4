import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./globals.css";

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text>Hola mundo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

