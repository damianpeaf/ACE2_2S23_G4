import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../hooks';

export const Co2 = () => {

  const { state } = useAppContext();

  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }} >
      <MaterialCommunityIcons name="molecule-co2" size={100} color="black" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
          {`${state.live_data.air_quality} ppm`}
        </Text>
      </View>
    </View>
  )
}