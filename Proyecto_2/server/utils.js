const { TimeSeriesDuplicatePolicies, TimeSeriesEncoding } =  require('@redis/time-series');

const createTimeSerie = async (redisClient, name) => {
    let temperatureSerie = false

    try {
        await redisClient.ts.GET(name)
        temperatureSerie = true
    } catch (error) {
        temperatureSerie = false
    }

    if (!temperatureSerie) {
        const created = await redisClient.ts.create(name, {
            RETENTION: 86400000 * 21,
            ENCODING: TimeSeriesEncoding.UNCOMPRESSED,
            DUPLICATE_POLICY: TimeSeriesDuplicatePolicies.BLOCK,
        })

        if (created === 'OK') {
            console.log('Created', name, 'time series')
        } else {
            console.log('Failed to create', name, 'time series')
        }
    } else {
        console.log(name, 'time series already exists')
    }
}

module.exports = {
    createTimeSerie
}