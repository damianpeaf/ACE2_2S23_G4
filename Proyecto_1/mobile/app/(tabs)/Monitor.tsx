import { ScrollView, View, Text, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';

import Chart from '../../components/Chart';
import { generateLabels, generateData } from '../../utils/data';

import SocketIOClient from 'socket.io-client';


const Monitor = () => {

    const [hasConnection, setConnection] = useState(false);
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {

        const socket = SocketIOClient("http://192.168.1.7:3000", {
            transports: ["websocket"],
        });

        socket.connect();
        socket.on('connect', () => {
            setConnection(true);
            setTime(null);
        });

        socket.on('disconnect', () => {
            setConnection(false);
            setTime(new Date().toLocaleTimeString());
        }
        );
    }, []);



    const labels = generateLabels(7)
    const data = generateData(7)

    const [isPerson, setIsPerson] = useState(false)

    return (
        <ScrollView >
            <View className='p-3 flex flex-col justify-center items-center'>

                <Text className='text-center text-2xl font-bold text-gray-700 mb-5'>
                    {
                        `${hasConnection ? 'Conectado' : 'Desconectados'} ${time ? `hace ${time}` : ''}`
                    }
                </Text>

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
            </View>
        </ScrollView>
    )
}

export default Monitor