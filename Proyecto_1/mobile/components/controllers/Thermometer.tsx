import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '../../hooks';


const listName = [
  {
    "name": "thermometer-empty"
  },
  {
    "name": "thermometer-quarter"
  },
  {
    "name": "thermometer-half"
  },
  {
    "name": "thermometer-three-quarters"
  },
  {
    "name": "thermometer-full"
  },
  {
    "name": "thermometer-4"
  }
]


export const Thermometer = () => {
  const { state } = useAppContext();

  return (
    <View>
      <FontAwesome name="thermometer-4" style={styles.icon} />
      <Text style={styles.text}>
        {`${state.live_data.temperature[0]} °C`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 100,
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
