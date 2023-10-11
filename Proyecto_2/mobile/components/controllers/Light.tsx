import { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import {LightRequest} from '../api/api'

const lightOn = "#FBBA22"
const lightOff = "rgb(192,192,192)"

export const Light = () => {

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [changeSVG, setChangeSVG] = useState(lightOff);


  // onPressLearnMore
  const onPressOnOffLight = async () => {
    // set changeSVG
    if (changeSVG === lightOff) {
      setChangeSVG(lightOn)
      // send rquest
      await LightRequest(true)
      return
    }

    setChangeSVG(lightOff)
    await LightRequest(false)
  }
 
  //  add a timeout to disable the button durning 5 seconds
  useEffect(() => {
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
    }, 1000);
  }, [changeSVG])

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Foundation name="lightbulb" size={120} color={changeSVG} />
      <Button
        disabled={buttonDisabled}
        onPress={onPressOnOffLight}
        title="ON / OFF"
        color={changeSVG}
      />
    </View>
  )
}