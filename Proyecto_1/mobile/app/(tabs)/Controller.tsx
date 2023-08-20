import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Light from '../../components/controllers/light'
import Thermo from '../../components/controllers/thermo'
import Co2 from '../../components/controllers/co2'
import Air from '../../components/controllers/air'

const Controller = () => {
    return (
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
    )
}
const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '50%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgBlue: {
        backgroundColor: '#C7CAC7',
    },
    bgGreen: {
        backgroundColor: '#C7CAC7',
    },
    bgRed: {
        backgroundColor: '#C7CAC7',
    },
    bgYellow: {
        backgroundColor: '#C7CAC7',
    },
});

export default Controller