import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'

const _layout = () => {
    return (
        <Tabs >
            <Tabs.Screen name="Monitor" options={{
                tabBarLabel: "Monitor de sensores",
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="motion-sensor" size={24} color="black" />
                ),
                headerTitle: "Monitor de sensores"
            }} />
            <Tabs.Screen name="Controller" options={{
                tabBarLabel: "Controlador",
                tabBarIcon: ({ color, size }) => (
                    <Feather name="cpu" size={24} color="black" />
                ),
                headerTitle: "Controlador"
            }} />
            <Tabs.Screen name="Notifications" options={{
                tabBarLabel: "Notificaciones",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="notifications" size={24} color="black" />
                ),
                headerTitle: "Notificaciones"
            }} />
        </Tabs>
    )
}

export default _layout