import { View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    Light,
    Thermometer,
    Co2,
    Air,
    Empty
} from "../../components/controllers/"


const components = [
    {
        name: 'Light1',
        component: <Empty />
    },
    {
        name: 'Light2',
        component: <Empty />
    },
    {
        name: 'Light',
        component: <Light />
    },
    {
        name: 'Thermo',
        component: <Thermometer />
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
                        <View key={index} style={[styles.gridItem]}>
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
    },

    gridItem: {
        margin: 5,
        padding: 5,
        height: 150,
        width: 180,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

});

export default Controller