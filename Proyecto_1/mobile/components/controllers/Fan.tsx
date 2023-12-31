import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@react-native-assets/slider';
import { useAppContext } from '../../hooks';
import { VentState } from '../../interface';

const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  'off': <MaterialCommunityIcons size={100} color="black" name="fan-off" />,
  'vel_1': <MaterialCommunityIcons size={100} color="black" name="fan-speed-1" />,
  'vel_2': <MaterialCommunityIcons size={100} color="black" name="fan-speed-2" />,
};

const valueMap: {
  [key: number]: VentState;
} = {
  0: 'off',
  1: 'vel_1',
  2: 'vel_2',
}

export const Air = () => {
  const { setVentState, state } = useAppContext();

  const [sliderValue, setSliderValue] = useState(
    state.global_state.vent_state === 'off' ? 0 : state.global_state.vent_state === 'vel_1' ? 1 : 2
  );

  const handleSliderValueChange = (value: number) => {
    setSliderValue(Math.floor(value));
  };

  useEffect(() => {
    handleEmit();
  }, [sliderValue]);


  const handleEmit = () => {

    switch (sliderValue) {
      case 0:
        setVentState('off');
        break;
      case 1:
        setVentState('vel_1');
        break;
      default:
        setVentState('vel_2');
        break;
    }

  }

  return (
    <View style={styles.viewStyles}>
      {ItemComponents[state.global_state.vent_state]}
      <Slider
        style={styles.sliderStyles}
        value={sliderValue}
        onValueChange={(newValue) => {
          handleSliderValueChange(newValue);
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
