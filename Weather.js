class Weather {
    state = {
        positionApi: 'http://www.nmc.cn/rest/position',
        weatherApi: 'http://www.nmc.cn/rest/weather',
        data: null
    }
    timeStamp = () => new Date().getTime()
    componentDidMount(callback) {
        fetch(`${this.state.positionApi}?_=${this.timeStamp()}`)
            .then(res => res.json())
            .then(res => {
                this.getWeather(res.code, callback)
            })
    }
    getWeather = (stationid, callback) => {
        fetch(`${this.state.weatherApi}?stationid=${stationid}&_=${this.timeStamp()}`)
            .then(res => res.json())
            .then(res => {
                this.state.data = res.data.predict
                callback && callback(this.render())
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
        return wind == '9999' ? '' : wind
    }
    getTemperature = (dayTe, nightTe) => {
        if (dayTe == '9999') return nightTe + '°C'
        else if (nightTe == '9999') return dayTe + '°C'
        return `${dayTe}°C ~ ${nightTe}°C`
    }

    render() {
        if (this.state.data) {
            const { data } = this.state
            console.log('%c [ data ]-43', 'font-size:13px; background:pink; color:#bf2c9f;', data)
            const { data: { detail } } = this.state
            const currentDay = Array.isArray(detail) && detail[0] ? detail[0] : {}
            const { day, night } = currentDay
            const [direct, power] = [this.getWind(day.wind.direct), this.getWind(day.wind.power)]
            const isSplitLine = direct && power
            return (
                ` <div class='weather-wrap'>
                    <div class='weather'>
                        <h1>${this.transfer(day.weather.info, night.weather.info)}</h1>
                    </div>
                    <div class='temperature'>
                        ${this.getTemperature(day.weather.temperature, night.weather.temperature)}
                        ${isSplitLine && '<span class="split-line">|</span>'}
                    </div>
                    <div class='wind'>
                        ${direct} ${power}
                    </div>
                    <div class='station'>
                        <h4>${data.station.province}•${data.station.city}</h4>
                    </div>
                    <div class='divider'></div>
                </div>
                `
            )
        }

    }



}
