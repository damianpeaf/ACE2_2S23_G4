import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';



{/* <AntDesign name="cloudupload" size={24} color="black" /> */}

const Co2 = () => {
  return (
    <View className='items-center' >
      {/* Import a svg */}
      <MaterialCommunityIcons name="molecule-co2" size={150} color="black" />
      {/* Text of the off, and speeds */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <AntDesign name="clouddownload" size={50} color="black" />
        {/* Texto with the %*/}
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>25 %</Text>
      </View>
    </View>
  )
}

export default Co2