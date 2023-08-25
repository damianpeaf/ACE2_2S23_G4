import { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { useAppContext } from '../../hooks';


const lightOn = "#FBBA22"
const lightOff = "rgb(192,192,192)"

export const Light = () => {

  const { enableLight, state } = useAppContext();
  const [changeSVG, setChangeSVG] = useState(
    state.global_state.is_light_on ? lightOn : lightOff
  );
  const [isWaiting, setisWaiting] = useState(false)


  // onPressLearnMore
  const onPressOnOffLight = () => {
    // set changeSVG
    setisWaiting(true)

    if (changeSVG === lightOff) {
      enableLight(true)
      return
    }

    enableLight(false)
  }

  useEffect(() => {
    setisWaiting(false)

    if (state.global_state.is_light_on) {
      setChangeSVG(lightOn);
      return
    }
    setChangeSVG(lightOff);
  }, [state.global_state.is_light_on])

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Foundation name="lightbulb" size={100} color={changeSVG} />
      <Button
        onPress={onPressOnOffLight}
        title="ON / OFF"
        color={changeSVG}
        disabled={isWaiting}
      />
    </View>
  )
}