import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '../../hooks';
import { useEffect, useState } from 'react';

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

const thermometerIcon: {
  [key: string]: JSX.Element;
} = {
  "thermometer-empty": <FontAwesome name="thermometer-empty" style={styles.icon} />,
  "thermometer-quarter": <FontAwesome name="thermometer-quarter" style={styles.icon} />,
  "thermometer-half": <FontAwesome name="thermometer-half" style={styles.icon} />,
  "thermometer-three-quarters": <FontAwesome name="thermometer-three-quarters" style={styles.icon} />,
  "thermometer-full": <FontAwesome name="thermometer-full" style={styles.icon} />,
  "thermometer-4": <FontAwesome name="thermometer-4" style={styles.icon} />,
}


export const Thermometer = () => {
  const { state } = useAppContext();

  const [thermometer, setThermometer] = useState('thermometer-4')

  useEffect(() => {
    const temperature = state.live_data.temperature[0]
    if (temperature < 10) {
      setThermometer('thermometer-empty')
      return
    }
    if (temperature < 20) {
      setThermometer('thermometer-quarter')
      return
    }
    if (temperature < 30) {
      setThermometer('thermometer-half')
      return
    }
    if (temperature < 40) {
      setThermometer('thermometer-three-quarters')
      return
    }
    setThermometer('thermometer-full')
  }, [state.live_data.temperature])


  return (
    <View>
      {thermometerIcon[thermometer]}
      <Text style={styles.text}>
        {`${state.live_data.temperature[0].toFixed(1)} °C`}
      </Text>
    </View>
  )
}
