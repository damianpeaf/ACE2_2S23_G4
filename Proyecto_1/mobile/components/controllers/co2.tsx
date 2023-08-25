import { View, Text } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export const Co2 = () => {
  return (
    <View className='items-center' >
      <MaterialCommunityIcons name="molecule-co2" size={150} color="black" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <AntDesign name="clouddownload" size={50} color="black" />
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>25 %</Text>
      </View>
    </View>
  )
}