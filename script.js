// ==========================================
// CYBERCITY
// REAL-TIME WEATHER + AIR QUALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // EXPLORE BUTTON
    // ======================================

    const exploreButton =
        document.getElementById("exploreButton");

    if (exploreButton) {
        exploreButton.addEventListener("click", function () {

            document
                .getElementById("city-dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });
    }


    // ======================================
    // MAP
    // ======================================

    const cityMap =
        L.map("cityMap").setView(
            [12.9716, 77.5946],
            12
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(cityMap);


    // ======================================
    // CITY LOCATIONS
    // ======================================

    const locations = [

        {
            name: "Central City",
            lat: 12.9716,
            lng: 77.5946,
            description:
                "Central urban monitoring zone."
        },

        {
            name: "Technology District",
            lat: 12.9352,
            lng: 77.6245,
            description:
                "High-density technology and business zone."
        },

        {
            name: "Green Zone",
            lat: 12.9980,
            lng: 77.5500,
            description:
                "Urban green and residential monitoring zone."
        },

        {
            name: "Industrial Zone",
            lat: 12.9950,
            lng: 77.7000,
            description:
                "Industrial infrastructure monitoring zone."
        },

        {
            name: "Transport Hub",
            lat: 12.9784,
            lng: 77.5725,
            description:
                "Major public transportation monitoring zone."
        }

    ];


    // ======================================
    // WEATHER CODE
    // ======================================

    function getWeatherDescription(code) {

        const weatherCodes = {

            0: "Clear sky",

            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",

            45: "Fog",
            48: "Depositing rime fog",

            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",

            56: "Light freezing drizzle",
            57: "Dense freezing drizzle",

            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",

            66: "Light freezing rain",
            67: "Heavy freezing rain",

            71: "Slight snow",
            73: "Moderate snow",
            75: "Heavy snow",

            77: "Snow grains",

            80: "Slight rain showers",
            81: "Moderate rain showers",
            82: "Violent rain showers",

            85: "Slight snow showers",
            86: "Heavy snow showers",

            95: "Thunderstorm",

            96: "Thunderstorm with slight hail",
            99: "Thunderstorm with heavy hail"

        };

        return weatherCodes[code] ||
            "Unknown conditions";

    }


    // ======================================
    // AIR QUALITY LEVEL
    // ======================================

    function getAQILevel(aqi) {

        if (aqi === null ||
            aqi === undefined ||
            isNaN(aqi)) {

            return "Unavailable";

        }


        if (aqi <= 50) {
            return "Good";
        }

        if (aqi <= 100) {
            return "Moderate";
        }

        if (aqi <= 150) {
            return "Unhealthy for sensitive groups";
        }

        if (aqi <= 200) {
            return "Unhealthy";
        }

        if (aqi <= 300) {
            return "Very Unhealthy";
        }

        return "Hazardous";

    }


    // ======================================
    // SHOW LOCATION
    // ======================================

    function showLocation(location) {

        document.getElementById(
            "locationName"
        ).textContent = location.name;


        document.getElementById(
            "locationDescription"
        ).textContent =
            location.description;


        document.getElementById(
            "trafficData"
        ).textContent = "API pending";


        document.getElementById(
            "waterData"
        ).textContent = "API pending";


        document.getElementById(
            "energyData"
        ).textContent = "API pending";


        document.getElementById(
            "lightData"
        ).textContent = "API pending";


        document.getElementById(
            "parkingData"
        ).textContent = "API pending";


        document.getElementById(
            "airData"
        ).textContent = "Loading...";


        document.getElementById(
            "locationPanel"
        ).style.display = "block";


        // Get REAL weather + air quality

        fetchRealCityData(
            location.lat,
            location.lng
        );

    }


    // ======================================
    // REAL WEATHER + AIR QUALITY
    // ======================================

    async function fetchRealCityData(
        latitude,
        longitude
    ) {

        try {

            // ==================================
            // WEATHER API
            // ==================================

            const weatherURL =
                "https://api.open-meteo.com/v1/forecast" +

                "?latitude=" +
                latitude +

                "&longitude=" +
                longitude +

                "&current=" +

                "temperature_2m," +
                "relative_humidity_2m," +
                "apparent_temperature," +
                "precipitation," +
                "weather_code," +
                "wind_speed_10m" +

                "&timezone=auto";


            // ==================================
            // AIR QUALITY API
            // ==================================

            const airURL =
                "https://air-quality-api.open-meteo.com/v1/air-quality" +

                "?latitude=" +
                latitude +

                "&longitude=" +
                longitude +

                "&current=" +

                "pm10," +
                "pm2_5," +
                "us_aqi" +

                "&timezone=auto";


            // ==================================
            // FETCH BOTH APIs
            // ==================================

            const responses =
                await Promise.all([

                    fetch(weatherURL),

                    fetch(airURL)

                ]);


            if (!responses[0].ok ||
                !responses[1].ok) {

                throw new Error(
                    "API request failed"
                );

            }


            const weather =
                await responses[0].json();


            const air =
                await responses[1].json();


            // ==================================
            // WEATHER VALUES
            // ==================================

            const currentWeather =
                weather.current;


            const temperature =
                currentWeather.temperature_2m;


            const humidity =
                currentWeather.relative_humidity_2m;


            const apparent =
                currentWeather.apparent_temperature;


            const precipitation =
                currentWeather.precipitation;


            const wind =
                currentWeather.wind_speed_10m;


            const weatherCode =
                currentWeather.weather_code;


            const weatherDescription =
                getWeatherDescription(
                    weatherCode
                );


            // ==================================
            // AIR QUALITY VALUES
            // ==================================

            const currentAir =
                air.current;


            const pm25 =
                currentAir.pm2_5;


            const pm10 =
                currentAir.pm10;


            const aqi =
                currentAir.us_aqi;


            const aqiLevel =
                getAQILevel(aqi);


            // ==================================
            // AIR QUALITY PANEL
            // ==================================

            document.getElementById(
                "airData"
            ).textContent =

                aqi !== null &&
                aqi !== undefined

                ? "AQI " + aqi

                : "Unavailable";


            // ==================================
            // WEATHER DESCRIPTION
            // ==================================

            document.getElementById(
                "locationDescription"
            ).textContent =

                weatherDescription +

                " • " +

                temperature +
                "°C • Humidity " +
                humidity +
                "%";


            // ==================================
            // CONSOLE
            // ==================================

            console.log(
                "CYBERCITY REAL-TIME DATA"
            );


            console.log(
                "Temperature:",
                temperature,
                "°C"
            );


            console.log(
                "Humidity:",
                humidity,
                "%"
            );


            console.log(
                "Feels like:",
                apparent,
                "°C"
            );


            console.log(
                "Precipitation:",
                precipitation,
                "mm"
            );


            console.log(
                "Wind:",
                wind,
                "km/h"
            );


            console.log(
                "Weather:",
                weatherDescription
            );


            console.log(
                "PM2.5:",
                pm25,
                "µg/m³"
            );


            console.log(
                "PM10:",
                pm10,
                "µg/m³"
            );


            console.log(
                "US AQI:",
                aqi
            );


            console.log(
                "AQI Level:",
                aqiLevel
            );


            // ==================================
            // STORE REAL DATA
            // ==================================

            window.cyberCityLiveData = {

                latitude:
                    latitude,

                longitude:
                    longitude,

                temperature:
                    temperature,

                humidity:
                    humidity,

                apparentTemperature:
                    apparent,

                precipitation:
                    precipitation,

                windSpeed:
                    wind,

                weather:
                    weatherDescription,

                pm25:
                    pm25,

                pm10:
                    pm10,

                aqi:
                    aqi,

                aqiLevel:
                    aqiLevel,

                timestamp:
                    new Date().toISOString()

            };


        }

        catch (error) {

            console.error(
                "CyberCity API Error:",
                error
            );


            document.getElementById(
                "airData"
            ).textContent =
                "Data unavailable";


            document.getElementById(
                "locationDescription"
            ).textContent =
                "Unable to retrieve live data.";

        }

    }


    // ======================================
    // ADD MAP MARKERS
    // ======================================

    locations.forEach(
        function (location) {

            const marker =
                L.marker([
                    location.lat,
                    location.lng
                ]).addTo(cityMap);


            marker.bindPopup(

                "<b>" +
                location.name +
                "</b><br>" +

                "Tap to load real weather & air quality."

            );


            marker.on(
                "click",
                function () {

                    showLocation(location);

                }
            );

        }
    );


    // ======================================
    // CLOSE LOCATION
    // ======================================

    const closeButton =
        document.getElementById(
            "closeLocation"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                document.getElementById(
                    "locationPanel"
                ).style.display =
                    "none";

            }
        );

    }


    // ======================================
    // STREET INTELLIGENCE
    // ======================================

    const analyzeButton =
        document.getElementById(
            "analyzeButton"
        );


    const streetSearch =
        document.getElementById(
            "streetSearch"
        );


    const analysisResult =
        document.getElementById(
            "analysisResult"
        );


    // ======================================
    // GEOCODING
    // ======================================

    async function findLocation(
        searchText
    ) {

        const url =

            "https://geocoding-api.open-meteo.com/v1/search" +

            "?name=" +
            encodeURIComponent(searchText) +

            "&count=1" +

            "&language=en" +

            "&format=json";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Location search failed"
            );

        }


        const data =
            await response.json();


        if (!data.results ||
            data.results.length === 0) {

            throw new Error(
                "Location not found"
            );

        }


        return data.results[0];

    }


    // ======================================
    // ANALYZE STREET
    // ======================================

    async function analyzeStreet() {

        const street =
            streetSearch.value.trim();


        // EMPTY SEARCH

        if (street === "") {

            analysisResult.innerHTML = `

                <div class="result-placeholder">

                    <div class="placeholder-icon">
                        ⚠️
                    </div>

                    <h3>
                        Enter a Street or Area
                    </h3>

                    <p>
                        Please enter a location first.
                    </p>

                </div>

            `;

            return;

        }


        // LOADING

        analysisResult.innerHTML = `

            <div class="result-placeholder">

                <div class="placeholder-icon">
                    🌐
                </div>

                <h3>
                    Fetching Live Data...
                </h3>

                <p>
                    Connecting to real weather
                    and air-quality services.
                </p>

            </div>

        `;


        try {

            // ==================================
            // FIND REAL LOCATION
            // ==================================

            const location =
                await findLocation(
                    street
                );


            const latitude =
                location.latitude;


            const longitude =
                location.longitude;


            // ==================================
            // WEATHER
            // ==================================

            const weatherURL =

                "https://api.open-meteo.com/v1/forecast" +

                "?latitude=" +
                latitude +

                "&longitude=" +
                longitude +

                "&current=" +

                "temperature_2m," +
                "relative_humidity_2m," +
                "apparent_temperature," +
                "precipitation," +
                "weather_code," +
                "wind_speed_10m" +

                "&timezone=auto";


            // ==================================
            // AIR QUALITY
            // ==================================

            const airURL =

                "https://air-quality-api.open-meteo.com/v1/air-quality" +

                "?latitude=" +
                latitude +

                "&longitude=" +
                longitude +

                "&current=" +

                "pm10," +
                "pm2_5," +
                "us_aqi" +

                "&timezone=auto";


            // ==================================
            // FETCH LIVE DATA
            // ==================================

            const responses =
                await Promise.all([

                    fetch(weatherURL),

                    fetch(airURL)

                ]);


            if (!responses[0].ok ||
                !responses[1].ok) {

                throw new Error(
                    "Live API unavailable"
                );

            }


            const weather =
                await responses[0].json();


            const air =
                await responses[1].json();


            // ==================================
            // WEATHER
            // ==================================

            const w =
                weather.current;


            const temperature =
                w.temperature_2m;


            const humidity =
                w.relative_humidity_2m;


            const apparent =
                w.apparent_temperature;


            const precipitation =
                w.precipitation;


            const wind =
                w.wind_speed_10m;


            const weatherDescription =
                getWeatherDescription(
                    w.weather_code
                );


            // ==================================
            // AIR QUALITY
            // ==================================

            const a =
                air.current;


            const pm25 =
                a.pm2_5;


            const pm10 =
                a.pm10;


            const aqi =
                a.us_aqi;


            const aqiLevel =
                getAQILevel(aqi);


            // ==================================
            // RESULT
            // ==================================

            analysisResult.innerHTML = `

                <div class="analysis-header">

                    <div>

                        <span class="analysis-label">
                            🌐 LIVE DATA
                        </span>

                        <h3>
                            ${location.name}
                        </h3>

                        <p>
                            ${location.country || ""}
                        </p>

                    </div>


                    <div class="health-score">

                        <span>
                            US AQI
                        </span>

                        <strong>
                            ${aqi ?? "--"}
                        </strong>

                    </div>

                </div>


                <div class="analysis-grid">


                    <div class="analysis-card">

                        <span>
                            🌡️ Temperature
                        </span>

                        <strong>
                            ${temperature}°C
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌦️ Conditions
                        </span>

                        <strong>
                            ${weatherDescription}
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            💧 Humidity
                        </span>

                        <strong>
                            ${humidity}%
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌬️ Wind
                        </span>

                        <strong>
                            ${wind} km/h
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌧️ Precipitation
                        </span>

                        <strong>
                            ${precipitation} mm
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🫁 PM2.5
                        </span>

                        <strong>
                            ${pm25 ?? "--"} µg/m³
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌫️ PM10
                        </span>

                        <strong>
                            ${pm10 ?? "--"} µg/m³
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🏭 Air Quality
                        </span>

                        <strong>
                            ${aqiLevel}
                        </strong>

                    </div>


                </div>


                <div class="ai-insight">

                    <span>
                        🧠 CYBERCITY LIVE INSIGHT
                    </span>

                    <p>

                        ${weatherDescription}.
                        Current temperature is
                        ${temperature}°C with
                        ${humidity}% humidity.
                        The reported US AQI is
                        ${aqi ?? "unavailable"},
                        classified as
                        ${aqiLevel}.

                    </p>

                </div>


                <div class="data-note">

                    LIVE DATA •
                    Open-Meteo Weather API +
                    Open-Meteo Air Quality API •
                    ${new Date().toLocaleString()}

                </div>

            `;


            // ==================================
            // STORE LIVE DATA
            // ==================================

            window.cyberCityLiveData = {

                location:
                    location.name,

                country:
                    location.country,

                latitude:
                    latitude,

                longitude:
                    longitude,

                temperature:
                    temperature,

                humidity:
                    humidity,

                apparentTemperature:
                    apparent,

                precipitation:
                    precipitation,

                windSpeed:
                    wind,

                weather:
                    weatherDescription,

                pm25:
                    pm25,

                pm10:
                    pm10,

                aqi:
                    aqi,

                aqiLevel:
                    aqiLevel,

                timestamp:
                    new Date().toISOString()

            };


            // ==================================
            // MOVE MAP TO LOCATION
            // ==================================

            cityMap.setView(
                [latitude, longitude],
                14
            );


        }

        catch (error) {

            console.error(
                error
            );


            analysisResult.innerHTML = `

                <div class="result-placeholder">

                    <div class="placeholder-icon">
                        ❌
                    </div>

                    <h3>
                        Data Retrieval Failed
                    </h3>

                    <p>
                        We could not find that location
                        or retrieve live data.
                        Try a city or well-known area.
                    </p>

                </div>

            `;

        }

    }


    // ======================================
    // ANALYZE BUTTON
    // ======================================

    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeStreet
        );

    }


    // ======================================
    // ENTER KEY
    // ======================================

    if (streetSearch) {

        streetSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    analyzeStreet();

                }

            }
        );

    }

});
