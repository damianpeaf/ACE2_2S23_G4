import { Stack } from "expo-router";

import { AppContext } from "../components/context";
import "../global.css";

export default function () {
    return <AppContext>
        <Stack >
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }} />
        </Stack>
    </AppContext>;
}