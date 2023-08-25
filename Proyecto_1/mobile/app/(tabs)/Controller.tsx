import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    Light,
    Thermo,
    Co2,
    Air
} from "../../components/controllers/"


const Controller = () => {

    return (
        <ScrollView>
            <View style={styles.gridContainer}>
                <View style={[styles.gridItem, styles.bgBlue]}>
                    <Light />
                </View>
                <View style={[styles.gridItem, styles.bgGreen]}>
                    <Thermo />
                </View>
                <View style={[styles.gridItem, styles.bgRed]}>
                    <Co2 />
                </View>
                <View style={[styles.gridItem, styles.bgYellow]}>
                    <Air />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    gridItem: {
        width: '100%',
        // height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bgBlue: {
        backgroundColor: '#FFFFFF',
    },
    bgGreen: {
        backgroundColor: '#FFFFFF',
    },
    bgRed: {
        backgroundColor: '#FFFFFF',
    },
    bgYellow: {
        backgroundColor: '#FFFFFF',
    },
});

export default Controller