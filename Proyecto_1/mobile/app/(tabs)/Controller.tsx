import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    Light,
    Thermo,
    Co2,
    Air
} from "../../components/controllers/"


const components = [
    {
        name: 'Light',
        component: <Light />
    },
    {
        name: 'Thermo',
        component: <Thermo />
    },
    {
        name: 'Co2',
        component: <Co2 />
    },
    {
        name: 'Air',
        component: <Air />
    },
]

const Controller = () => {

    return (
        <ScrollView>
            <View style={styles.gridContainer}>
                {
                    components.map((item, index) => (
                        <View key={index} style={[styles.gridItem, styles.bgMain]}>
                            {item.component}
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'column',
    },
    gridItem: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bgMain: {
        backgroundColor: '#FFFFFF',
    },
});

export default Controller