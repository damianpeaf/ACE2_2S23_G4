import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'

const tabActiveColor = "black"
const tabInactiveColor = "rgb(192,192,192)"

const _layout = () => {
    return (
        <Tabs >
            <Tabs.Screen name="Monitor" options={{
                tabBarLabel: "Monitor de sensores",
                headerTitle: "Monitor de sensores",
                tabBarActiveTintColor: tabActiveColor,
                tabBarInactiveTintColor: tabInactiveColor,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="motion-sensor" size={24} color={color} />
                ),
            }} />
            <Tabs.Screen name="Controller" options={{
                tabBarLabel: "Controlador",
                tabBarActiveTintColor: tabActiveColor,
                tabBarInactiveTintColor: tabInactiveColor,
                tabBarIcon: ({ color }) => (
                    <Feather name="cpu" size={24} color={color} />
                ),
                headerTitle: "Controlador"
            }} />
            <Tabs.Screen name="Notifications" options={{
                tabBarLabel: "Notificaciones",
                tabBarActiveTintColor: tabActiveColor,
                tabBarInactiveTintColor: tabInactiveColor,
                tabBarIcon: ({ color }) => (
                    <Ionicons name="notifications" size={24} color={color} />
                ),
                headerTitle: "Notificaciones"
            }} />
        </Tabs>
    )
}

export default _layout