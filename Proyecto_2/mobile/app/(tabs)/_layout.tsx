import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'

const tabActiveColor = "black"
const tabInactiveColor = "rgb(192,192,192)"

const _layout = () => {
    return (
        <Tabs >
            <Tabs.Screen name="Controller" options={{
                tabBarLabel: "Controlador",
                tabBarActiveTintColor: tabActiveColor,
                tabBarInactiveTintColor: tabInactiveColor,
                tabBarIcon: ({ color }) => (
                    <Feather name="cpu" size={24} color={color} />
                ),
                headerTitle: "Controlador"
            }} />
        </Tabs>
    )
}

export default _layout