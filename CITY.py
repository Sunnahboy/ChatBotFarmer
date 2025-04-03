def is_valid_city(city_name):
    # List of valid Malaysian city names
    malaysian_cities = [
        "Kuala Lumpur",
        "George Town",
        "Ipoh",
        "Shah Alam",
        "Petaling Jaya",
        "Johor Bahru",
        "Malacca City",
        "Alor Setar",
        "Kuala Terengganu",
        "Kota Bharu",
        "Seremban",
        "Kuantan",
        "Kuching",
        "Kota Kinabalu"
        "Nairobi"
        # Add more city names as needed
    ]
    # Check if the provided city name is in the list of valid Malaysian cities
    return city_name in malaysian_cities
