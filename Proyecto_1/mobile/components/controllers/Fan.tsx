import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@react-native-assets/slider';
import { useAppContext } from '../../hooks';
import { VentState } from '../../interface';

const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  "fan-off": <MaterialCommunityIcons size={100} color="black" name="fan-off" />,
  "fan-speed-1": <MaterialCommunityIcons size={100} color="black" name="fan-speed-1" />,
  "fan-speed-2": <MaterialCommunityIcons size={100} color="black" name="fan-speed-2" />,
};

export const Air = () => {
  const { setVentState, state } = useAppContext();

  const [sliderValue, setSliderValue] = useState(
    state.global_state.vent_state === 'off' ? 0 : state.global_state.vent_state === 'vel_1' ? 1 : 2
  );
  const [itemName, setItemName] = useState(
    state.global_state.vent_state === 'off' ? 'fan-off' : state.global_state.vent_state === 'vel_1' ? 'fan-speed-1' : 'fan-speed-2'
  );

  const calculateVentState = (value: number): VentState => {
    switch (Math.floor(value)) {
      case 0:
        setItemName('fan-off');
        return 'off';
      case 1:
        setItemName('fan-speed-1');
        return 'vel_1';
      default:
        setItemName('fan-speed-2');
        return 'vel_2';
    }
  };

  return (
    <View style={styles.viewStyles}>
      {ItemComponents[itemName]}
      <Slider
        style={styles.sliderStyles}
        value={sliderValue}
        onValueChange={(newValue) => {
          setSliderValue(newValue);
          setVentState(calculateVentState(newValue));
        }}
        step={1}
        minimumValue={0}
        maximumValue={2}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#F4F4F4"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    width: '100%',
    padding: 10,
  },
  sliderStyles: {
    width: '80%',
    height: 50,
  },
});
