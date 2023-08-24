import { useState } from 'react'

import { View, Button } from 'react-native'
import { Foundation } from '@expo/vector-icons';

import { useAppContext } from '../../hooks';
import { useEffect } from 'react';


const Light = () => {

  const { enableLight, state } = useAppContext();
  // use state
  const [changeSVG, setChangeSVG] = useState("#00000");
  const [isWaiting, setisWaiting] = useState(false)


  // onPressLearnMore
  const onPressOnOffLight = () => {
    // set changeSVG
    setisWaiting(true)
    if (changeSVG == "#00000") {
      enableLight(true)
    }
    else {
      enableLight(false)
    }
  }

  useEffect(() => {
    setisWaiting(false)

    if (state.global_state.is_light_on) {
      setChangeSVG("#FBBA22");
    } else {
      setChangeSVG("#00000");
    }

  }, [state.global_state.is_light_on])

  return (
    <View >
      {/* Import a svg */}
      <Foundation name="lightbulb" size={200} color={changeSVG} />

      <Button
        onPress={onPressOnOffLight}
        title="ON / OFF"
        color="black"
        disabled={isWaiting}
      />
    </View>
  )
}

export default Light