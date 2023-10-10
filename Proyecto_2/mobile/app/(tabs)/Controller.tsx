import { View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    Air,
} from "../../components/controllers/"
import { Door } from '../../components/controllers/Dor'


const components = [
    {
        name: 'Air',
        component: <Air />
    },
    {
        name: 'Door',
        component: <Door />
    }
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
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
    },

    gridItem: {
        margin: 5,
        padding: 5,
        height: 350,
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

});

export default Controller