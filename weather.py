import requests


def get_weather(api_key, city_name):
    try:
        base_url = "http://api.openweathermap.org/data/2.5/weather"
        params = {
            'q': city_name,
            'appid': api_key,
            'units': 'metric'  # Use 'imperial' for Fahrenheit
        }
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an exception for 4xx and 5xx status codes

        data = response.json()
        main = data['main']
        wind = data['wind']
        clouds = data['clouds']
        rain = data.get('rain', {}).get('3h', 0)  # Get the rainfall in the last 3 hours

        weather_info = {
            "city": city_name,
            "temperature": f"{main['temp']}°C",
            "humidity": f"{main['humidity']}%",
            "wind_speed": f"{wind['speed']} m/s",
            "cloudiness": f"{clouds['all']}%",
            "precipitation": f"{rain} mm"
        }
        suggestions = []

        if main['temp'] < 10:
            suggestions.append("The temperature is quite low, consider protecting your crops from frost.")
        elif main['temp'] > 35:
            suggestions.append("The temperature is quite high, consider irrigating your crops to prevent wilting.")
        else:
            suggestions.append("The temperature is in a moderate range.")

        if main['humidity'] > 60:
            suggestions.append("The humidity is high, be on the lookout for fungal diseases.")
        elif main['humidity'] < 30:
            suggestions.append("The humidity is low, consider irrigating your crops to prevent drying out.")
        else:
            suggestions.append("The humidity is in a moderate range.")

        if wind['speed'] > 8:
            suggestions.append("The wind speed is high, consider staking young trees to prevent them from being uprooted.")
        else:
            suggestions.append("The wind speed is in a moderate range.")

        if clouds['all'] > 80:
            suggestions.append("It's quite cloudy, your solar-powered equipment might not work at full efficiency.")
        else:
            suggestions.append("The cloudiness is in a moderate range.")

        if rain > 20:
            suggestions.append("Heavy rainfall expected, consider harvesting your crops early to prevent them from getting waterlogged.")
        elif rain == 0:
            suggestions.append("No rainfall expected, consider irrigating your crops if the soil is dry.")
        else:
            suggestions.append("Moderate rainfall expected.")

        return weather_info, suggestions
    except requests.RequestException as e:
        # In case of any error, return an error message
        return {'error': str(e)}, None
