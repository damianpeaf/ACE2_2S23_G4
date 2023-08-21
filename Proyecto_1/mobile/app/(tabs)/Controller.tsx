import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Light from '../../components/controllers/light'
import Thermo from '../../components/controllers/thermo'
import Co2 from '../../components/controllers/co2'
import Air from '../../components/controllers/air'
import { ScrollView } from 'react-native-gesture-handler'

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