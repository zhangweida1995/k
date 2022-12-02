class Weather {
    state = {
        positionApi: 'http://www.nmc.cn/rest/position',
        weatherApi: 'http://www.nmc.cn/rest/weather',
        data: null
    }
    timeStamp = () => new Date().getTime()
    componentDidMount() {
        fetch(`${this.state.positionApi}?_=${this.timeStamp()}`)
            .then(res => res.json())
            .then(res => {
                this.getWeather(res.code)
            })
    }
    getWeather = (stationid) => {
        fetch(`${this.state.weatherApi}?stationid=${stationid}&_=${this.timeStamp()}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res.data.predict })
            })
    }

    transfer = (dayWeather, nightWeather) => {
        if (dayWeather == '9999') return nightWeather
        else if (dayWeather && nightWeather) {
            return dayWeather === nightWeather ? dayWeather : `${dayWeather}转${nightWeather}`
        }
        return dayWeather || nightWeather
    }
    getWind = (wind) => {
        return wind == '9999' ? null : wind
    }
    getTemperature = (dayTe, nightTe) => {
        if (dayTe == '9999') return nightTe + '°C'
        else if (nightTe == '9999') return dayTe + '°C'
        return `${dayTe}°C ~ ${nightTe}°C`
    }
    /**
     * 
     * @returns 
    render() {
        if (this.state.data) {
            const { data } = this.state
            const { data: { detail } } = this.state
            const currentDay = Array.isArray(detail) && detail[0] ? detail[0] : {}
            const { day, night } = currentDay
            const [direct, power] = [this.getWind(day.wind.direct), this.getWind(day.wind.power)]
            const isSplitLine = direct && power
            return (
                <div className='weather-wrap'>
                    <div className='weather'>
                        <h1>{this.transfer(day.weather.info, night.weather.info)}</h1>
                    </div>
                    <div className='temperature'>
                        {this.getTemperature(day.weather.temperature, night.weather.temperature)}
                        {isSplitLine && (<span className='split-line'>|</span>)}
                    </div>
                    <div className='wind'>
                        {direct} {power}
                    </div>
                    <div className='station'>
                        <h4>{data.station.province}•{data.station.city}</h4>
                    </div>
                    <div className='divider'></div>
                </div>
            )
        }

    }
     */


}
