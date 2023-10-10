import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@react-native-assets/slider';
import { VentState } from '../../interface';
import {FanRequest} from '../api/api'

const ItemComponents: {
  [key: string]: JSX.Element;
} = {
  'off': <MaterialCommunityIcons size={120} color="black" name="fan-off" />,
  'vel_1': <MaterialCommunityIcons size={120} color="black" name="fan-speed-1" />,
  'vel_2': <MaterialCommunityIcons size={120} color="black" name="fan-speed-2" />,
};


export const Air = () => {

  const [statusFan, setStatusFan] = useState<VentState>("off");

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderValueChange = (value: number) => {
    setSliderValue(Math.floor(value));

  };

  useEffect(() => {
    handleEmit();
  }, [sliderValue]);


   const handleEmit = async () => {

    switch (sliderValue) {
    case 0:
      setStatusFan("off");
      await FanRequest("off");
      break;
    case 1:
      setStatusFan("vel_1");
      await FanRequest("vel_1");
      break;
    default:
      setStatusFan("vel_2");
      await FanRequest("vel_2");
      break;
    }

  }

  return (
    <View style={styles.viewStyles}>
      {ItemComponents[statusFan]}
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  sliderStyles: {
    width: '50%',
    height: 50,
  },
});
