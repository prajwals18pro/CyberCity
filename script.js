// ==========================================
// CYBERCITY
// Intelligent Digital Twin
// ==========================================


// ==========================================
// EXPLORE CITY BUTTON
// ==========================================

function exploreCity() {

    document
        .getElementById("city-dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// CREATE CITY MAP
// ==========================================

const cityMap = L.map("cityMap").setView(
    [12.9716, 77.5946],
    12
);


// ==========================================
// OPENSTREETMAP
// ==========================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors"
    }
).addTo(cityMap);


// ==========================================
// CITY LOCATIONS
// ==========================================

const locations = [

    {
        name: "Central City",
        lat: 12.9716,
        lng: 77.5946,

        description:
            "Central urban monitoring zone.",

        traffic: "Heavy",
        air: "Moderate",
        water: "Normal",
        energy: "68%",
        light: "94%",
        parking: "18 slots"
    },


    {
        name: "Technology District",
        lat: 12.9352,
        lng: 77.6245,

        description:
            "High-density technology and business zone.",

        traffic: "Very Heavy",
        air: "Good",
        water: "Normal",
        energy: "82%",
        light: "97%",
        parking: "42 slots"
    },


    {
        name: "Green Zone",
        lat: 12.9980,
        lng: 77.5500,

        description:
            "Urban green and residential monitoring zone.",

        traffic: "Low",
        air: "Excellent",
        water: "Good",
        energy: "51%",
        light: "91%",
        parking: "27 slots"
    },


    {
        name: "Industrial Zone",
        lat: 12.9950,
        lng: 77.7000,

        description:
            "Industrial infrastructure monitoring zone.",

        traffic: "Moderate",
        air: "Poor",
        water: "Normal",
        energy: "89%",
        light: "86%",
        parking: "11 slots"
    },


    {
        name: "Transport Hub",
        lat: 12.9784,
        lng: 77.5725,

        description:
            "Major public transportation monitoring zone.",

        traffic: "Heavy",
        air: "Moderate",
        water: "Normal",
        energy: "73%",
        light: "95%",
        parking: "31 slots"
    }

];


// ==========================================
// ADD MAP MARKERS
// ==========================================

locations.forEach(function(location) {

    const marker = L.marker([
        location.lat,
        location.lng
    ]).addTo(cityMap);


    marker.bindPopup(
        "<b>" +
        location.name +
        "</b><br>" +
        "Tap to inspect this area."
    );


    marker.on(
        "click",
        function() {

            showLocation(location);

        }
    );

});


// ==========================================
// SHOW LOCATION INFORMATION
// ==========================================

function showLocation(location) {

    document.getElementById(
        "locationName"
    ).textContent =
        location.name;


    document.getElementById(
        "locationDescription"
    ).textContent =
        location.description;


    document.getElementById(
        "trafficData"
    ).textContent =
        location.traffic;


    document.getElementById(
        "airData"
    ).textContent =
        location.air;


    document.getElementById(
        "waterData"
    ).textContent =
        location.water;


    document.getElementById(
        "energyData"
    ).textContent =
        location.energy;


    document.getElementById(
        "lightData"
    ).textContent =
        location.light;


    document.getElementById(
        "parkingData"
    ).textContent =
        location.parking;


    document.getElementById(
        "locationPanel"
    ).style.display =
        "block";

}


// ==========================================
// CLOSE LOCATION PANEL
// ==========================================

function closeLocation() {

    document.getElementById(
        "locationPanel"
    ).style.display =
        "none";

}


// ==========================================
// STREET INTELLIGENCE
// ==========================================

function analyzeStreet() {

    const input =
        document.getElementById(
            "streetSearch"
        );


    const result =
        document.getElementById(
            "analysisResult"
        );


    const street =
        input.value.trim();


    // Check empty input

    if (street === "") {

        result.innerHTML = `

            <div class="result-placeholder">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <h3>
                    Enter a Street or Area
                </h3>

                <p>
                    Please enter a location
                    to begin analysis.
                </p>

            </div>

        `;

        return;

    }


    // ==========================================
    // SIMULATED INTELLIGENCE DATA
    // ==========================================

    const trafficLevels = [
        "Low",
        "Moderate",
        "High",
        "Very High"
    ];


    const airLevels = [
        "Excellent",
        "Good",
        "Moderate",
        "Poor"
    ];


    const traffic =
        trafficLevels[
            Math.floor(
                Math.random() *
                trafficLevels.length
            )
        ];


    const air =
        airLevels[
            Math.floor(
                Math.random() *
                airLevels.length
            )
        ];


    const water =
        Math.floor(
            70 +
            Math.random() * 30
        );


    const energy =
        Math.floor(
            50 +
            Math.random() * 45
        );


    const lighting =
        Math.floor(
            80 +
            Math.random() * 20
        );


    const parking =
        Math.floor(
            5 +
            Math.random() * 50
        );


    const safety =
        Math.floor(
            70 +
            Math.random() * 30
        );


    // ==========================================
    // CALCULATE CITY HEALTH SCORE
    // ==========================================

    const trafficScore = {

        "Low": 95,

        "Moderate": 80,

        "High": 60,

        "Very High": 40

    };


    const airScore = {

        "Excellent": 95,

        "Good": 85,

        "Moderate": 70,

        "Poor": 45

    };


    const cityHealth = Math.round(

        (

            trafficScore[traffic] +

            airScore[air] +

            water +

            energy +

            lighting +

            safety

        ) / 6

    );


    // ==========================================
    // AI INSIGHT
    // ==========================================

    let insight;


    if (traffic === "Very High") {

        insight =
            "Traffic congestion is significantly elevated. Traffic optimization is recommended.";

    }

    else if (traffic === "High") {

        insight =
            "Traffic is above normal levels. Intelligent traffic management may improve flow.";

    }

    else if (air === "Poor") {

        insight =
            "Air quality requires attention. Pollution monitoring and green-zone planning are recommended.";

    }

    else if (cityHealth >= 85) {

        insight =
            "Urban conditions are healthy. The area is performing efficiently across major systems.";

    }

    else {

        insight =
            "The area is operating normally with opportunities for infrastructure optimization.";

    }


    // ==========================================
    // DISPLAY RESULT
    // ==========================================

    result.innerHTML = `

        <div class="analysis-header">

            <div>

                <span class="analysis-label">
                    📍 ANALYSIS COMPLETE
                </span>

                <h3>
                    ${street}
                </h3>

            </div>

            <div class="health-score">

                <span>
                    CITY HEALTH
                </span>

                <strong>
                    ${cityHealth}%
                </strong>

            </div>

        </div>


        <div class="analysis-grid">


            <div class="analysis-card">

                <span>
                    🚦 Traffic
                </span>

                <strong>
                    ${traffic}
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    🌫️ Air Quality
                </span>

                <strong>
                    ${air}
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    💧 Water Health
                </span>

                <strong>
                    ${water}%
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    ⚡ Energy
                </span>

                <strong>
                    ${energy}%
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    💡 Lighting
                </span>

                <strong>
                    ${lighting}%
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    🅿️ Parking
                </span>

                <strong>
                    ${parking} slots
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    🛡️ Safety
                </span>

                <strong>
                    ${safety}%
                </strong>

            </div>


            <div class="analysis-card">

                <span>
                    🧠 Intelligence
                </span>

                <strong>
                    ACTIVE
                </strong>

            </div>


        </div>


        <div class="ai-insight">

            <span>
                🧠 AI URBAN INSIGHT
            </span>

            <p>
                ${insight}
            </p>

        </div>


        <div class="data-note">

            DEMO INTELLIGENCE ENGINE •
            REAL-TIME APIs WILL BE CONNECTED IN A LATER STAGE

        </div>

    `;

}
