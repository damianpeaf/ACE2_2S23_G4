import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Air = () => {
  return (
    <View >
      {/* Import a svg */}
      <MaterialCommunityIcons name="fan" size={240} color="black" />
      <Text>Air</Text>
    </View>
  )
}

export default Air