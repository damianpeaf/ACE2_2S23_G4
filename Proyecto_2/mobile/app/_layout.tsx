import { Stack } from "expo-router";

import "../global.css";
import Toast from 'react-native-toast-message';

export default function () {
    return <>
        <Stack >
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }} />
        </Stack>
        <Toast position='top' />
    </>;
}