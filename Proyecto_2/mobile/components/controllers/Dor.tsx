import { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import {DoorRequest} from '../api/api'
import { FontAwesome5 } from '@expo/vector-icons'; 


const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  'open': <FontAwesome5 name="door-open" size={100} color="black" />,
  'close': <FontAwesome5 name="door-closed" size={100} color="black" />,
};



export const Door = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [changeSVG, setChangeSVG] = useState(false);

  // onPressLearnMore
  const onPressOpenCloseDoor = async() => {
    // set changeSVG

    if (!changeSVG) {
      setChangeSVG(true)
      // send rquest
      await DoorRequest(changeSVG)
      return
    }

    setChangeSVG(false)
    await DoorRequest(changeSVG)
  
  }

  // add a timeout to disable the button durning 5 seconds
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
      {changeSVG ? ItemComponents['open'] : ItemComponents['close']}
      <Button
        color={changeSVG ? "#000000" : "#4F5353"}
        disabled={buttonDisabled}
        onPress={onPressOpenCloseDoor}
        title="OPEN / CLOSE"
      />
    </View>
  )
}