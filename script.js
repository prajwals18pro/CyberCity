// ==========================================
// CYBERCITY
// REAL-TIME + HISTORICAL INTELLIGENCE
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
    // WEATHER DESCRIPTION
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
    // AQI LEVEL
    // ======================================

    function getAQILevel(aqi) {

        if (
            aqi === null ||
            aqi === undefined ||
            isNaN(aqi)
        ) {

            return "Unavailable";

        }

        if (aqi <= 50) return "Good";

        if (aqi <= 100) return "Moderate";

        if (aqi <= 150)
            return "Unhealthy for sensitive groups";

        if (aqi <= 200)
            return "Unhealthy";

        if (aqi <= 300)
            return "Very Unhealthy";

        return "Hazardous";

    }


    // ======================================
    // MAP LOCATION DATA
    // ======================================

    async function showLocation(location) {

        document.getElementById(
            "locationName"
        ).textContent = location.name;


        document.getElementById(
            "locationDescription"
        ).textContent =
            "Loading real-time data...";


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


        try {

            const weatherURL =

                "https://api.open-meteo.com/v1/forecast" +

                "?latitude=" +
                location.lat +

                "&longitude=" +
                location.lng +

                "&current=" +

                "temperature_2m," +
                "relative_humidity_2m," +
                "apparent_temperature," +
                "precipitation," +
                "weather_code," +
                "wind_speed_10m" +

                "&timezone=auto";


            const airURL =

                "https://air-quality-api.open-meteo.com/v1/air-quality" +

                "?latitude=" +
                location.lat +

                "&longitude=" +
                location.lng +

                "&current=" +

                "pm10," +
                "pm2_5," +
                "us_aqi" +

                "&timezone=auto";


            const responses =
                await Promise.all([

                    fetch(weatherURL),
                    fetch(airURL)

                ]);


            const weather =
                await responses[0].json();

            const air =
                await responses[1].json();


            const w =
                weather.current;

            const a =
                air.current;


            document.getElementById(
                "airData"
            ).textContent =
                "AQI " +
                (a.us_aqi ?? "--");


            document.getElementById(
                "locationDescription"
            ).textContent =

                getWeatherDescription(
                    w.weather_code
                ) +

                " • " +

                w.temperature_2m +
                "°C • Humidity " +

                w.relative_humidity_2m +
                "%";


        }

        catch (error) {

            console.error(error);

            document.getElementById(
                "locationDescription"
            ).textContent =
                "Live data unavailable.";

            document.getElementById(
                "airData"
            ).textContent =
                "Unavailable";

        }

    }


    // ======================================
    // MAP MARKERS
    // ======================================

    locations.forEach(function (location) {

        const marker =
            L.marker([
                location.lat,
                location.lng
            ]).addTo(cityMap);


        marker.bindPopup(

            "<b>" +
            location.name +
            "</b><br>" +
            "Tap to inspect live data."

        );


        marker.on(
            "click",
            function () {

                showLocation(location);

            }
        );

    });


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
    // LOCATION SEARCH
    // ======================================

    async function findLocation(searchText) {

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


        if (
            !data.results ||
            data.results.length === 0
        ) {

            throw new Error(
                "Location not found"
            );

        }


        return data.results[0];

    }


    // ======================================
    // GET REAL DATA
    // ======================================

    async function getLiveData(
        latitude,
        longitude
    ) {

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


        const responses =
            await Promise.all([

                fetch(weatherURL),
                fetch(airURL)

            ]);


        if (
            !responses[0].ok ||
            !responses[1].ok
        ) {

            throw new Error(
                "Live API unavailable"
            );

        }


        return {

            weather:
                await responses[0].json(),

            air:
                await responses[1].json()

        };

    }


    // ======================================
    // HISTORICAL DATA
    // ======================================

    async function getHistoricalData(
        latitude,
        longitude
    ) {

        // Past 7 days
        // Uses Open-Meteo archived
        // past-day model data.

        const weatherURL =

            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" +
            latitude +

            "&longitude=" +
            longitude +

            "&hourly=" +

            "temperature_2m," +
            "relative_humidity_2m," +
            "precipitation" +

            "&past_days=7" +

            "&forecast_days=0" +

            "&timezone=auto";


        const airURL =

            "https://air-quality-api.open-meteo.com/v1/air-quality" +

            "?latitude=" +
            latitude +

            "&longitude=" +
            longitude +

            "&hourly=" +

            "pm2_5," +
            "pm10," +
            "us_aqi" +

            "&past_days=7" +

            "&forecast_days=0" +

            "&timezone=auto";


        const responses =
            await Promise.all([

                fetch(weatherURL),
                fetch(airURL)

            ]);


        if (
            !responses[0].ok ||
            !responses[1].ok
        ) {

            throw new Error(
                "Historical API unavailable"
            );

        }


        return {

            weather:
                await responses[0].json(),

            air:
                await responses[1].json()

        };

    }


    // ======================================
    // DAILY AVERAGES
    // ======================================

    function makeDailyData(
        weather,
        air
    ) {

        const result = [];


        for (
            let day = 0;
            day < 7;
            day++
        ) {

            const start =
                day * 24;

            const end =
                start + 24;


            const tempValues =
                weather.hourly.temperature_2m
                    .slice(start, end)
                    .filter(
                        value =>
                            value !== null
                    );


            const pmValues =
                air.hourly.pm2_5
                    .slice(start, end)
                    .filter(
                        value =>
                            value !== null
                    );


            const aqiValues =
                air.hourly.us_aqi
                    .slice(start, end)
                    .filter(
                        value =>
                            value !== null
                    );


            const average =
                function (values) {

                    if (
                        values.length === 0
                    ) {

                        return null;

                    }


                    const total =
                        values.reduce(
                            (
                                sum,
                                value
                            ) =>
                                sum + value,
                            0
                        );


                    return (
                        total /
                        values.length
                    );

                };


            result.push({

                date:
                    weather.hourly.time[start]
                        .split("T")[0],

                temperature:
                    average(
                        tempValues
                    ),

                pm25:
                    average(
                        pmValues
                    ),

                aqi:
                    average(
                        aqiValues
                    )

            });

        }


        return result;

    }


    // ======================================
    // DRAW CHART
    // ======================================

    function drawChart(
        canvasId,
        labels,
        values,
        title,
        unit
    ) {

        const canvas =
            document.getElementById(
                canvasId
            );


        if (!canvas) return;


        const ctx =
            canvas.getContext("2d");


        const width =
            canvas.width =
                canvas.clientWidth *
                window.devicePixelRatio;


        const height =
            canvas.height =
                260 *
                window.devicePixelRatio;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.scale(
            window.devicePixelRatio,
            window.devicePixelRatio
        );


        const W =
            canvas.clientWidth;


        const H = 260;


        const cleanValues =
            values.filter(
                value =>
                    value !== null &&
                    !isNaN(value)
            );


        if (
            cleanValues.length === 0
        ) {

            return;

        }


        const min =
            Math.min(...cleanValues);


        const max =
            Math.max(...cleanValues);


        const range =
            max - min || 1;


        // Background

        ctx.fillStyle =
            "#07111f";

        ctx.fillRect(
            0,
            0,
            W,
            H
        );


        // Title

        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 15px Arial";

        ctx.fillText(
            title,
            18,
            25
        );


        // Unit

        ctx.font =
            "12px Arial";

        ctx.fillText(
            unit,
            W - 55,
            25
        );


        // Graph area

        const left = 40;

        const right = W - 20;

        const top = 50;

        const bottom = H - 35;


        // Grid

        ctx.strokeStyle =
            "#24354d";

        ctx.lineWidth = 1;


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const y =
                top +
                (
                    i / 3
                ) *
                (
                    bottom - top
                );


            ctx.beginPath();

            ctx.moveTo(
                left,
                y
            );

            ctx.lineTo(
                right,
                y
            );

            ctx.stroke();

        }


        // Line

        ctx.beginPath();


        values.forEach(
            function (
                value,
                index
            ) {

                if (
                    value === null ||
                    isNaN(value)
                ) return;


                const x =
                    left +
                    (
                        index /
                        (values.length - 1)
                    ) *
                    (
                        right - left
                    );


                const y =
                    bottom -
                    (
                        (
                            value - min
                        ) /
                        range
                    ) *
                    (
                        bottom - top
                    );


                if (index === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                }

                else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }
        );


        ctx.strokeStyle =
            "#00eaff";

        ctx.lineWidth = 3;

        ctx.stroke();


        // Points

        values.forEach(
            function (
                value,
                index
            ) {

                if (
                    value === null ||
                    isNaN(value)
                ) return;


                const x =
                    left +
                    (
                        index /
                        (values.length - 1)
                    ) *
                    (
                        right - left
                    );


                const y =
                    bottom -
                    (
                        (
                            value - min
                        ) /
                        range
                    ) *
                    (
                        bottom - top
                    );


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    4,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    "#ffffff";

                ctx.fill();


            }
        );


        // Labels

        ctx.fillStyle =
            "#8fa4bf";

        ctx.font =
            "10px Arial";


        labels.forEach(
            function (
                label,
                index
            ) {

                const x =
                    left +
                    (
                        index /
                        (labels.length - 1)
                    ) *
                    (
                        right - left
                    );


                ctx.fillText(
                    label,
                    x - 18,
                    H - 12
                );

            }
        );

    }


    // ======================================
    // ANALYZE STREET
    // ======================================

    async function analyzeStreet() {

        const street =
            streetSearch.value.trim();


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


        // ==================================
        // LOADING
        // ==================================

        analysisResult.innerHTML = `

            <div class="result-placeholder">

                <div class="placeholder-icon">
                    🌐
                </div>

                <h3>
                    Fetching City Intelligence...
                </h3>

                <p>
                    Connecting to real-time and
                    historical data services.
                </p>

            </div>

        `;


        try {

            // ==================================
            // FIND LOCATION
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
            // LIVE DATA
            // ==================================

            const live =
                await getLiveData(
                    latitude,
                    longitude
                );


            const w =
                live.weather.current;


            const a =
                live.air.current;


            // ==================================
            // HISTORICAL DATA
            // ==================================

            const historical =
                await getHistoricalData(
                    latitude,
                    longitude
                );


            const daily =
                makeDailyData(
                    historical.weather,
                    historical.air
                );


            // ==================================
            // DATE LABELS
            // ==================================

            const labels =
                daily.map(
                    item =>
                        item.date.slice(5)
                );


            // ==================================
            // DISPLAY
            // ==================================

            analysisResult.innerHTML = `

                <div class="analysis-header">

                    <div>

                        <span class="analysis-label">
                            🌐 LIVE + HISTORICAL DATA
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
                            LIVE AQI
                        </span>

                        <strong>
                            ${a.us_aqi ?? "--"}
                        </strong>

                    </div>

                </div>


                <div class="analysis-grid">

                    <div class="analysis-card">

                        <span>
                            🌡️ Current Temperature
                        </span>

                        <strong>
                            ${w.temperature_2m}°C
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌦️ Current Conditions
                        </span>

                        <strong>
                            ${getWeatherDescription(
                                w.weather_code
                            )}
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            💧 Humidity
                        </span>

                        <strong>
                            ${w.relative_humidity_2m}%
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🫁 Live PM2.5
                        </span>

                        <strong>
                            ${a.pm2_5 ?? "--"} µg/m³
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🌫️ Live PM10
                        </span>

                        <strong>
                            ${a.pm10 ?? "--"} µg/m³
                        </strong>

                    </div>


                    <div class="analysis-card">

                        <span>
                            🏭 Air Quality
                        </span>

                        <strong>
                            ${getAQILevel(
                                a.us_aqi
                            )}
                        </strong>

                    </div>

                </div>


                <div class="historical-section">

                    <div class="historical-title">

                        <span>
                            📊 HISTORICAL INTELLIGENCE
                        </span>

                        <h3>
                            Previous 7 Days
                        </h3>

                        <p>
                            Real API data aggregated
                            into daily averages.
                        </p>

                    </div>


                    <div class="chart-container">

                        <canvas
                            id="temperatureChart">
                        </canvas>

                    </div>


                    <div class="chart-container">

                        <canvas
                            id="aqiChart">
                        </canvas>

                    </div>


                    <div class="historical-table">

                        <h3>
                            📅 Historical Data
                        </h3>

                        <div class="history-row history-head">

                            <span>Date</span>
                            <span>Temp</span>
                            <span>PM2.5</span>
                            <span>AQI</span>

                        </div>


                        ${daily.map(
                            item => `

                                <div class="history-row">

                                    <span>
                                        ${item.date}
                                    </span>

                                    <span>
                                        ${
                                            item.temperature !== null
                                            ? item.temperature.toFixed(1) + "°C"
                                            : "--"
                                        }
                                    </span>

                                    <span>
                                        ${
                                            item.pm25 !== null
                                            ? item.pm25.toFixed(1)
                                            : "--"
                                        }
                                    </span>

                                    <span>
                                        ${
                                            item.aqi !== null
                                            ? item.aqi.toFixed(0)
                                            : "--"
                                        }
                                    </span>

                                </div>

                            `
                        ).join("")}

                    </div>

                </div>


                <div class="ai-insight">

                    <span>
                        🧠 CYBERCITY TREND ANALYSIS
                    </span>

                    <p>

                        Historical data has been
                        retrieved for
                        <strong>
                            ${location.name}
                        </strong>.
                        The dashboard is now able
                        to compare recent conditions
                        instead of showing a single
                        snapshot.

                    </p>

                </div>


                <div class="data-note">

                    REAL API DATA •
                    Open-Meteo Weather +
                    Open-Meteo Air Quality •
                    ${new Date().toLocaleString()}

                </div>

            `;


            // ==================================
            // DRAW TEMPERATURE
            // ==================================

            drawChart(

                "temperatureChart",

                labels,

                daily.map(
                    item =>
                        item.temperature
                ),

                "🌡️ Temperature — 7 Days",

                "°C"

            );


            // ==================================
            // DRAW AQI
            // ==================================

            drawChart(

                "aqiChart",

                labels,

                daily.map(
                    item =>
                        item.aqi
                ),

                "🌫️ Air Quality — 7 Days",

                "AQI"

            );


            // ==================================
            // MOVE MAP
            // ==================================

            cityMap.setView(
                [latitude, longitude],
                14
            );


            // ==================================
            // SAVE DATA
            // ==================================

            window.cyberCityHistoricalData = {

                location:
                    location.name,

                country:
                    location.country,

                latitude:
                    latitude,

                longitude:
                    longitude,

                live:
                    live,

                historical:
                    daily,

                retrievedAt:
                    new Date().toISOString()

            };


            console.log(
                "CyberCity historical data:",
                window.cyberCityHistoricalData
            );


        }

        catch (error) {

            console.error(
                "CyberCity error:",
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
                        We could not retrieve the
                        historical data. Try again
                        with a city such as Bengaluru.
                    </p>

                </div>

            `;

        }

    }


    // ======================================
    // BUTTON
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
