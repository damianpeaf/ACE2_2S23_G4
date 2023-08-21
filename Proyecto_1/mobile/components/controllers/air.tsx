import { View, Text, Button } from 'react-native'
import React, {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@react-native-assets/slider';



const listValues = {
  "off" : {
    "name":"fan-off"
  },
  "speed-1" : {
    "name":"fan-speed-1"
  },
  "speed-2" : {
    "name":"fan-speed-2"
  }

}



const Air = () => {
  // use state
  const [fanStatus, setFanStatus] = useState(listValues.off);

  // get value
  const getValue = (value: any) => {
    if (value === 0 || value < 0.99) {
      setFanStatus(listValues.off);
    } else if (value >= 1 && value < 1.99) {
      setFanStatus(listValues['speed-1']);
    } else if (value === 2) {
      setFanStatus(listValues['speed-2']);
    }

  }

  return (
    <View >
      {/* Import a svg */}
      <MaterialCommunityIcons name={fanStatus.name}  size={150} color="black" />
      {/* Text of the off, and speeds */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>OFF</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>1</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>2</Text>
      </View>

      {/* Slider of speed 1 and 2 */}
      <Slider 
        style={{width: '100%', height: 50}}
        onValueChange={(value) => getValue(value)}
        minimumValue={0}
        maximumValue={2}
        step={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor='darkcyan'         // The color of the slider's thumb
        enabled={true}                    // If false, the slider won't respond to touches anymore
        trackHeight={4}                   // The track's height in pixel
        thumbSize={15}                    // The thumb's size in pixel
        slideOnTap={true}                 // If true, touching the slider will update it's value. No need to slide the thumb.
      />
      {/* Texto with the %*/}
    </View>
  )
}

export default Air