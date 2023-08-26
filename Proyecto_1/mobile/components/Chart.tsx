import { Dimensions, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartData, LineChartProps } from 'react-native-chart-kit/dist/line-chart/LineChart'


type ColorScheme = 'orange' | 'blue' | 'red'

const defaultColorScheme = {
    chartConfig: {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    },
    bezier: true,
    style: {
        marginVertical: 8,
        borderRadius: 16
    }
}

const defaultColorSchemes: Map<ColorScheme, Required<Pick<LineChartProps, 'chartConfig' | 'bezier' | 'style'>>> = new Map()

defaultColorSchemes.set('orange', defaultColorScheme)
defaultColorSchemes.set('blue', {
    bezier: true,
    style: {
        marginVertical: 8,
        borderRadius: 16
    },
    chartConfig: {
        backgroundColor: "#14BDDB",
        backgroundGradientFrom: "#BCD2E3",
        backgroundGradientTo: "#BCD2E3",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(73, 100, 225, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#4965E0"
        }
    }
})
defaultColorSchemes.set('red', {
    bezier: true,
    style: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 16
    },
    chartConfig: {
        backgroundColor: "#3b2d46",
        backgroundGradientFrom: "#fe9889",
        backgroundGradientTo: "#fe9889",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#3b2d46",
            fill: "#3b2d46"
        }
    }
})


type ChartProps = {
    colorScheme?: ColorScheme,
    conf?: Partial<LineChartProps>
    data: LineChartData
    title?: string,
    decimalPlaces?: number
}

export const Chart = ({ colorScheme = 'orange', conf = {}, data, title, decimalPlaces = 2 }: ChartProps) => {

    const colorSchemeConf = defaultColorSchemes.get(colorScheme) ?? defaultColorScheme
    colorSchemeConf.chartConfig.decimalPlaces = decimalPlaces

    return (
        <View className='my-5'>
            <Text className='
                text-center
                text-2xl
                font-bold
                text-gray-700
                mb-5
            '>{title} </Text>
            <LineChart
                {...colorSchemeConf}
                data={{
                    datasets: [
                        {
                            data: [0].concat(data.datasets[0].data),
                        }
                    ],
                    labels: [''].concat(data.labels)
                }}
                width={Dimensions.get("window").width * 0.9}
                height={220}
                {...conf}
            />
        </View>

    )
}
