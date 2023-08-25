import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Chart } from '../../components/Chart';
import { useAppContext } from '../../hooks';

const Monitor = () => {

    const { state } = useAppContext();

    return (
        <ScrollView >
            {/* <View className='p-3 flex flex-col justify-center items-center'>

                <Chart
                    data={{
                        datasets: [
                            {
                                data,
                            },
                        ],
                        labels
                    }}
                    title='Temperatura'
                    conf={{
                        yAxisSuffix: '°C',
                    }}
                    decimalPlaces={1}
                />
                <Chart
                    data={{
                        datasets: [
                            {
                                data,
                            },
                        ],
                        labels
                    }}
                    colorScheme='blue'
                    title='Luz'
                    conf={{
                        yAxisSuffix: 'lx',
                    }}
                    decimalPlaces={0}
                />
                <Chart
                    data={{
                        datasets: [
                            {
                                data,
                            },
                        ],
                        labels
                    }}
                    colorScheme='red'
                    title='Calidad del aire'
                    conf={{
                        yAxisSuffix: 'ppm',
                    }}
                    decimalPlaces={0}
                />
                <Text className='text-center text-2xl font-bold text-gray-700 mb-5'>Presencia</Text>
                {
                    isPerson
                        ? <MaterialIcons name="emoji-people" size={48} color="black" />
                        : <MaterialCommunityIcons name="cancel" size={48} color="black" />
                }
            </View> */}
        </ScrollView>
    )
}

export default Monitor