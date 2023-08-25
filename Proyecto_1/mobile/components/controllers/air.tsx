import { useState } from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@react-native-assets/slider';
import { useAppContext } from '../../hooks';
import { VentState } from '../../interface';



const listValues = {
  "off": {
    "name": "fan-off"
  },
  "speed-1": {
    "name": "fan-speed-1"
  },
  "speed-2": {
    "name": "fan-speed-2"
  }
}

const listV = [
  {
    "name": "fan-off"
  }, {
    "name": "fan-speed-1"
  }, {
    "name": "fan-speed-2"
  }
]

const itemIcon = {
  "fan-off": <MaterialCommunityIcons size={150} color="black" name="fan-off" />,
  "fan-speed-1": <MaterialCommunityIcons size={150} color="black" name="fan-speed-1" />,
  "fan-speed-2": <MaterialCommunityIcons size={150} color="black" name="fan-speed-2" />,
}

export const Air = () => {

  const { setVentState } = useAppContext();

  // use state
  const [sliderValue, setSliderValue] = useState(0); // Valor inicial

  // name
  const [name, setName] = useState('fan-off')

  // get value
  const getValue = (value: number): VentState => {
    if (value === 0 || value < 0.99) {
      setName('fan-off')
      return 'off'
    }

    if (value >= 1 && value < 1.99) {
      setName('fan-speed-1')
      return 'vel_1'
    }

    setName('fan-speed-2')
    return 'vel_2'
  }

  return (
    <View>
      <MaterialCommunityIcons size={150} color="black" name="fan-speed-1" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>OFF</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>1</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>2</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 50 }}
        onValueChange={(value) => {
          setSliderValue(value)
          setVentState(getValue(value))
        }}
        minimumValue={0}
        maximumValue={2}
        value={
          sliderValue
        }
        step={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor='darkcyan'         // The color of the slider's thumb
        enabled={true}                    // If false, the slider won't respond to touches anymore
        trackHeight={4}                   // The track's height in pixel
        thumbSize={15}                    // The thumb's size in pixel
        slideOnTap={true}                 // If true, touching the slider will update it's value. No need to slide the thumb.
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{sliderValue}</Text>
    </View>
  )
}