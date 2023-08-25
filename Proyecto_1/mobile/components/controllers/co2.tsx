import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Co2 = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
    }} >
      <MaterialCommunityIcons name="molecule-co2" size={100} color="black" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>25 %</Text>
      </View>
    </View>
  )
}