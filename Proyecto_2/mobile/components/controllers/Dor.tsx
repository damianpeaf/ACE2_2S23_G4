import { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { useAppContext } from '../../hooks';
import { FontAwesome5 } from '@expo/vector-icons'; 


const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  'open': <FontAwesome5 name="door-open" size={24} color="black" />,
  'close': <FontAwesome5 name="door-closed" size={24} color="black" />,
};



export const Door = () => {

  const { enableDoor, state } = useAppContext();
  const [changeSVG, setChangeSVG] = useState(
    state.global_state.is_door_open ? true : false
  );


  // onPressLearnMore
  const onPressOpenCloseDoor = () => {
    // set changeSVG

    if (!changeSVG) {
      enableDoor(true)
      return
    }

    enableDoor(false)
  
  }

  useEffect(() => {

    if (state.global_state.is_door_open) {
      setChangeSVG(true);
      return
    }
    setChangeSVG(false);
  }, [state.global_state.is_door_open])

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {changeSVG ? ItemComponents['open'] : ItemComponents['close']}
      <Button
        onPress={onPressOpenCloseDoor}
        title="OPEN / CLOSE"
      />
    </View>
  )
}