import { View, Text, Button } from 'react-native'
import React, {useState} from 'react'
import { Foundation } from '@expo/vector-icons';


const Light = () => {

  // use state
  const [changeSVG, setChangeSVG] = useState("#00000");


  // onPressLearnMore
  const onPressOnOffLight = () => {
    // set changeSVG
    if (changeSVG == "#00000") {
      setChangeSVG("#FBBA22");
    }
    else {
      setChangeSVG("#00000");
    }
  }



  return (
    <View >
      {/* Import a svg */}
      <Foundation name="lightbulb" size={200} color={changeSVG} />

      <Button
      onPress={onPressOnOffLight}
      title="ON / OFF"
      color="black"
      />
    </View>
  )
}

export default Light