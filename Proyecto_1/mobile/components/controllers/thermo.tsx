import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';


const listName = [
  {
    "name":"thermometer-empty"
  },
  {
   "name":"thermometer-quarter" 
  },
  {
    "name":"thermometer-half"
  },
  {
    "name":"thermometer-three-quarters"
  },
  {
    "name":"thermometer-full"
  },
  {
    "name":"thermometer-4"
  }
]

// https://www.svgrepo.com/svg/499912/light-bulb
const Thermo = () => {
  return (
    <View className='mt-5' >
      {/* Import a svg */}
      <FontAwesome name="thermometer-4" size={200} color="black"   />
      {/* Texto with the ºC */}
      <Text style={{fontSize: 30, fontWeight: 'bold' , textAlign:'center'}}>25ºC</Text>
    </View>
  )
}

export default Thermo