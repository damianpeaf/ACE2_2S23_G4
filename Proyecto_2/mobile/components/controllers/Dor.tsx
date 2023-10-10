import { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import { Foundation } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons'; 


const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  'open': <FontAwesome5 name="door-open" size={100} color="black" />,
  'close': <FontAwesome5 name="door-closed" size={100} color="black" />,
};



export const Door = () => {

  const [changeSVG, setChangeSVG] = useState(false);

  // onPressLearnMore
  const onPressOpenCloseDoor = () => {
    // set changeSVG

    if (!changeSVG) {
      setChangeSVG(true)
      return
    }

    setChangeSVG(false)
  
  }



  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {changeSVG ? ItemComponents['open'] : ItemComponents['close']}
      <Button
        color={changeSVG ? "#000000" : "#4F5353"}
        onPress={onPressOpenCloseDoor}
        title="OPEN / CLOSE"
      />
    </View>
  )
}