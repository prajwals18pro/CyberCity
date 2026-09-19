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
/* =========================================
   CYBERCITY REAL-TIME SMART ALERT ENGINE
   ========================================= */

function updateSmartAlerts() {

    const text = document.body.innerText;

    /* Find PM2.5 value */
    const pmMatch = text.match(/PM2\.5\s*[:\-]?\s*([\d.]+)/i);

    /* Find temperature value */
    const tempMatch = text.match(/(?:Current Temperature|Temperature)\s*[:\-]?\s*([\d.]+)/i);

    if (!pmMatch && !tempMatch) {
        return;
    }

    const pm25 = pmMatch ? parseFloat(pmMatch[1]) : null;
    const temperature = tempMatch ? parseFloat(tempMatch[1]) : null;

    const airAlert = document.getElementById("airAlert");
    const airAlertText = document.getElementById("airAlertText");

    const tempAlert = document.getElementById("tempAlert");
    const tempAlertText = document.getElementById("tempAlertText");

    const alertIcon = document.querySelector(".alert-icon");
    const alertTitle = document.getElementById("alertTitle");
    const alertMessage = document.getElementById("alertMessage");

    if (!airAlert || !tempAlert) return;

    /* ================= AIR QUALITY ================= */

    let airLevel = "GOOD";
    let airText = "Air quality is within a healthy range.";

    if (pm25 !== null) {

        if (pm25 > 35) {
            airLevel = "CRITICAL";
            airText = "High PM2.5 detected. Immediate attention recommended.";
        }
        else if (pm25 > 25) {
            airLevel = "WARNING";
            airText = "PM2.5 levels are elevated. Monitor air quality.";
        }
    }

    airAlert.textContent = airLevel;
    airAlertText.textContent = airText;


    /* ================= TEMPERATURE ================= */

    let tempLevel = "NORMAL";
    let tempText = "Temperature conditions are stable.";

    if (temperature !== null) {

        if (temperature >= 35) {
            tempLevel = "CRITICAL";
            tempText = "Extreme heat detected.";
        }
        else if (temperature >= 30) {
            tempLevel = "WARNING";
            tempText = "High temperature detected.";
        }
    }

    tempAlert.textContent = tempLevel;
    tempAlertText.textContent = tempText;


    /* ================= CITY STATUS ================= */

    if (airLevel === "CRITICAL" || tempLevel === "CRITICAL") {

        alertIcon.textContent = "🔴";
        alertTitle.textContent = "CITY STATUS: CRITICAL";
        alertMessage.textContent =
            "Critical environmental conditions detected.";

    }
    else if (airLevel === "WARNING" || tempLevel === "WARNING") {

        alertIcon.textContent = "🟡";
        alertTitle.textContent = "CITY STATUS: WARNING";
        alertMessage.textContent =
            "Some environmental conditions require attention.";

    }
    else {

        alertIcon.textContent = "🟢";
        alertTitle.textContent = "CITY STATUS: NORMAL";
        alertMessage.textContent =
            "No critical environmental conditions detected.";
    }
}


/* Check repeatedly until live data appears */
setInterval(updateSmartAlerts, 3000);
/* =========================================
   COMMAND CENTER LIVE DATA
   ========================================= */

function updateCommandCenter() {

    const commandTemp = document.getElementById("commandTemperature");
    const commandAQI = document.getElementById("commandAQI");

    if (!commandTemp || !commandAQI) return;

    /* Find current temperature already displayed on the page */
    const tempMatch = document.body.innerText.match(
        /Current Temperature\s*([\d.]+)\s*°?C/i
    );

    /* Find AQI already displayed on the page */
    const aqiMatch = document.body.innerText.match(
        /LIVE AQI\s*(\d+)/i
    );

    if (tempMatch) {
        commandTemp.textContent = tempMatch[1] + "°C";
    }

    if (aqiMatch) {
        commandAQI.textContent = "AQI " + aqiMatch[1];
    }
}

/* Keep Command Center synchronized */
setInterval(updateCommandCenter, 3000);
// ======================================================
// CYBERCITY DEMO MODE
// ======================================================

(function () {

    function cyberCityDemoMode() {

        // Prevent duplicate buttons
        if (document.getElementById("cyberDemoButton")) {
            return;
        }

        // ------------------------------------------------
        // CREATE DEMO BUTTON
        // ------------------------------------------------

        const button = document.createElement("button");

        button.id = "cyberDemoButton";
        button.innerHTML = "▶ RUN CITY DEMO";

        button.style.cssText = `
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 9999;

            padding: 14px 20px;

            border: 1px solid rgba(0,255,200,0.5);
            border-radius: 30px;

            background:
                linear-gradient(
                    135deg,
                    #062b3a,
                    #03151f
                );

            color: #20e89a;

            font-size: 13px;
            font-weight: 800;

            letter-spacing: 0.5px;

            cursor: pointer;

            box-shadow:
                0 0 20px rgba(0,255,200,0.18);

            transition: all 0.3s ease;
        `;

        document.body.appendChild(button);


        // ------------------------------------------------
        // DEMO OVERLAY
        // ------------------------------------------------

        const overlay =
            document.createElement("div");

        overlay.id =
            "cyberDemoOverlay";

        overlay.style.cssText = `
            display: none;

            position: fixed;
            inset: 0;

            z-index: 10000;

            background:
                rgba(1,8,18,0.92);

            backdrop-filter:
                blur(12px);

            align-items: center;
            justify-content: center;

            padding: 20px;
        `;


        // ------------------------------------------------
        // DEMO PANEL
        // ------------------------------------------------

        overlay.innerHTML = `

            <div id="cyberDemoPanel"

                style="
                    width: min(520px, 100%);

                    padding: 30px;

                    border-radius: 24px;

                    border:
                        1px solid
                        rgba(0,255,200,0.25);

                    background:
                        linear-gradient(
                            145deg,
                            rgba(7,27,42,0.98),
                            rgba(2,12,22,0.98)
                        );

                    box-shadow:
                        0 0 50px
                        rgba(0,255,200,0.12);

                    text-align: center;
                ">

                <div
                    style="
                        font-size: 42px;
                        margin-bottom: 10px;
                    "
                >
                    🏙️
                </div>

                <div
                    style="
                        color:#20e89a;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:2px;
                    "
                >
                    CYBERCITY DEMO MODE
                </div>

                <h2
                    id="demoTitle"
                    style="
                        color:white;
                        margin:10px 0;
                    "
                >
                    Initializing City...
                </h2>

                <p
                    id="demoDescription"
                    style="
                        color:#9fb2c4;
                        line-height:1.6;
                        margin-bottom:22px;
                    "
                >
                    Preparing intelligent city simulation.
                </p>

                <div
                    style="
                        width:100%;
                        height:7px;

                        background:#12202d;

                        border-radius:20px;

                        overflow:hidden;
                    "
                >

                    <div
                        id="demoProgress"
                        style="
                            width:0%;
                            height:100%;

                            background:#20e89a;

                            transition:
                                width 0.5s ease;
                        "
                    ></div>

                </div>

                <div
                    id="demoStep"
                    style="
                        color:#6f879a;
                        font-size:12px;
                        margin-top:12px;
                    "
                >
                    Step 1 of 6
                </div>

                <button
                    id="closeDemoButton"

                    style="
                        margin-top:25px;

                        padding:10px 20px;

                        border-radius:20px;

                        border:
                            1px solid
                            rgba(255,255,255,0.15);

                        background:
                            rgba(255,255,255,0.05);

                        color:white;

                        cursor:pointer;
                    "
                >
                    CLOSE DEMO
                </button>

            </div>
        `;


        document.body.appendChild(overlay);


        // ------------------------------------------------
        // DEMO EVENTS
        // ------------------------------------------------

        let demoRunning = false;

        let demoTimer = null;


        button.addEventListener(
            "click",
            function () {

                if (demoRunning) {
                    return;
                }

                startCyberCityDemo();

            }
        );


        document
            .getElementById(
                "closeDemoButton"
            )
            .addEventListener(
                "click",
                function () {

                    stopCyberCityDemo();

                }
            );


        // ------------------------------------------------
        // SAFE UPDATE FUNCTION
        // ------------------------------------------------

        function updateElement(
            id,
            value
        ) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    value;

            }

        }


        // ------------------------------------------------
        // DEMO SCENARIOS
        // ------------------------------------------------

        const scenarios = [

            {
                title:
                    "🟢 CITY OPERATING NORMALLY",

                description:
                    "All monitored city systems are operating normally.",

                status:
                    "CITY STATUS: NORMAL",

                message:
                    "No critical conditions detected."
            },


            {
                title:
                    "🚦 TRAFFIC ACTIVITY DETECTED",

                description:
                    "The simulation detects increased traffic activity in a monitored urban zone.",

                status:
                    "CITY STATUS: ATTENTION",

                message:
                    "Traffic monitoring requires attention."
            },


            {
                title:
                    "🌫️ AIR QUALITY WARNING",

                description:
                    "The simulated AQI event triggers an environmental warning.",

                status:
                    "CITY STATUS: WARNING",

                message:
                    "Air-quality threshold requires monitoring."
            },


            {
                title:
                    "🚨 CITY ALERT ACTIVATED",

                description:
                    "CyberCity's alert layer escalates the simulated event for city operators.",

                status:
                    "CITY STATUS: WARNING",

                message:
                    "Multiple monitored conditions require attention."
            },


            {
                title:
                    "📊 COMMAND CENTER RESPONSE",

                description:
                    "The command center displays the simulated event and operational response.",

                status:
                    "CITY STATUS: MANAGED",

                message:
                    "City intelligence systems are responding."
            },


            {
                title:
                    "🟢 CITY SYSTEMS RECOVERED",

                description:
                    "The simulated event has ended and monitored systems return to normal.",

                status:
                    "CITY STATUS: NORMAL",

                message:
                    "All monitored systems are operating normally."
            }

        ];


        // ------------------------------------------------
        // START DEMO
        // ------------------------------------------------

        function startCyberCityDemo() {

            demoRunning = true;

            button.innerHTML =
                "⏳ DEMO RUNNING...";

            button.style.opacity =
                "0.6";

            overlay.style.display =
                "flex";


            let step = 0;


            function runStep() {

                if (!demoRunning) {
                    return;
                }


                const scenario =
                    scenarios[step];


                const title =
                    document.getElementById(
                        "demoTitle"
                    );

                const description =
                    document.getElementById(
                        "demoDescription"
                    );

                const progress =
                    document.getElementById(
                        "demoProgress"
                    );

                const stepText =
                    document.getElementById(
                        "demoStep"
                    );


                title.textContent =
                    scenario.title;


                description.textContent =
                    scenario.description;


                progress.style.width =
                    (
                        ((step + 1) /
                            scenarios.length) *
                        100
                    ) + "%";


                stepText.textContent =
                    "Step " +
                    (step + 1) +
                    " of " +
                    scenarios.length;


                // ----------------------------------------
                // UPDATE EXISTING ALERT CENTER
                // ----------------------------------------

                updateElement(
                    "alertTitle",
                    scenario.status
                );


                updateElement(
                    "alertMessage",
                    scenario.message
                );


                // ----------------------------------------
                // UPDATE COMMAND CENTER
                // ----------------------------------------

                if (step === 0) {

                    updateElement(
                        "commandAlerts",
                        "NORMAL"
                    );

                }

                else if (
                    step === 1 ||
                    step === 2
                ) {

                    updateElement(
                        "commandAlerts",
                        "ATTENTION"
                    );

                }

                else if (step === 3) {

                    updateElement(
                        "commandAlerts",
                        "ACTIVE"
                    );

                }

                else {

                    updateElement(
                        "commandAlerts",
                        "NORMAL"
                    );

                }


                // ----------------------------------------
                // UPDATE ALERT ICON
                // ----------------------------------------

                const alertStatus =
                    document.getElementById(
                        "cityAlertStatus"
                    );


                if (alertStatus) {

                    if (
                        step === 0 ||
                        step === 5
                    ) {

                        alertStatus.style.borderColor =
                            "rgba(32,232,154,0.25)";

                    }

                    else {

                        alertStatus.style.borderColor =
                            "rgba(255,180,50,0.4)";

                    }

                }


                // ----------------------------------------
                // SCROLL TO ALERT CENTER
                // ----------------------------------------

                if (
                    step === 1 ||
                    step === 2 ||
                    step === 3
                ) {

                    const alerts =
                        document.querySelector(
                            ".smart-alerts"
                        );

                    if (alerts) {

                        alerts.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }


                // ----------------------------------------
                // FINISH
                // ----------------------------------------

                if (
                    step ===
                    scenarios.length - 1
                ) {

                    demoTimer =
                        setTimeout(
                            function () {

                                stopCyberCityDemo();

                            },
                            3000
                        );

                    return;

                }


                step++;


                demoTimer =
                    setTimeout(
                        runStep,
                        3000
                    );

            }


            runStep();

        }


        // ------------------------------------------------
        // STOP DEMO
        // ------------------------------------------------

        function stopCyberCityDemo() {

            demoRunning = false;


            if (demoTimer) {

                clearTimeout(
                    demoTimer
                );

                demoTimer = null;

            }


            overlay.style.display =
                "none";


            button.innerHTML =
                "▶ RUN CITY DEMO";


            button.style.opacity =
                "1";


            // Restore normal display

            updateElement(
                "alertTitle",
                "CITY STATUS: NORMAL"
            );


            updateElement(
                "alertMessage",
                "No critical conditions detected."
            );


            updateElement(
                "commandAlerts",
                "ACTIVE"
            );

        }

    }


    // ------------------------------------------------
    // START AFTER PAGE LOAD
    // ------------------------------------------------

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            cyberCityDemoMode
        );

    }

    else {

        cyberCityDemoMode();

    }

})();
// ===============================
// CYBERCITY SIMPLE DEMO MODE
// ===============================

const demoBtn = document.createElement("button");

demoBtn.innerText = "▶ RUN CITY DEMO";

demoBtn.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
z-index:9999;
padding:14px 20px;
border:none;
border-radius:12px;
background:#00e5ff;
color:#001018;
font-size:15px;
font-weight:bold;
cursor:pointer;
box-shadow:0 0 20px #00e5ff;
`;

document.body.appendChild(demoBtn);

demoBtn.onclick = function () {

    const messages = [
        "🏙️ CITY SYSTEMS STARTING...",
        "🚦 TRAFFIC MONITORING ACTIVE",
        "🌫️ AIR QUALITY CHECKING...",
        "💧 WATER SYSTEM CHECKING...",
        "⚡ ENERGY SYSTEM CHECKING...",
        "🅿️ PARKING SYSTEM CHECKING...",
        "🛡️ CYBER SECURITY SCAN COMPLETE",
        "✅ CITY OPERATING NORMALLY"
    ];

    let i = 0;

    demoBtn.innerText = messages[i];

    const demo = setInterval(function () {

        i++;

        if (i >= messages.length) {
            clearInterval(demo);
            demoBtn.innerText = "▶ RUN CITY DEMO";
            return;
        }

        demoBtn.innerText = messages[i];

    }, 1500);
};
