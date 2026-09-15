// ==========================================
// CYBERCITY
// Intelligent Digital Twin
// ==========================================


// ==========================================
// EXPLORE CITY
// ==========================================

function exploreCity() {

    document
        .getElementById("city-dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// MAP
// ==========================================

const cityMap = L.map("cityMap").setView(
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


// ==========================================
// CITY LOCATIONS
// ==========================================

const locations = [

    {
        name: "Central City",
        lat: 12.9716,
        lng: 77.5946,
        description: "Central urban monitoring zone.",
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
        description: "High-density technology and business zone.",
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
        description: "Urban green and residential monitoring zone.",
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
        description: "Industrial infrastructure monitoring zone.",
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
        description: "Major public transportation monitoring zone.",
        traffic: "Heavy",
        air: "Moderate",
        water: "Normal",
        energy: "73%",
        light: "95%",
        parking: "31 slots"
    }

];


// ==========================================
// MAP MARKERS
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


    marker.on("click", function() {

        showLocation(location);

    });

});


// ==========================================
// SHOW LOCATION
// ==========================================

function showLocation(location) {

    document.getElementById(
        "locationName"
    ).textContent = location.name;


    document.getElementById(
        "locationDescription"
    ).textContent = location.description;


    document.getElementById(
        "trafficData"
    ).textContent = location.traffic;


    document.getElementById(
        "airData"
    ).textContent = location.air;


    document.getElementById(
        "waterData"
    ).textContent = location.water;


    document.getElementById(
        "energyData"
    ).textContent = location.energy;


    document.getElementById(
        "lightData"
    ).textContent = location.light;


    document.getElementById(
        "parkingData"
    ).textContent = location.parking;


    document.getElementById(
        "locationPanel"
    ).style.display = "block";

}


// ==========================================
// CLOSE LOCATION
// ==========================================

function closeLocation() {

    document.getElementById(
        "locationPanel"
    ).style.display = "none";

}


// ==========================================
// STREET INTELLIGENCE
// ==========================================

function analyzeStreet() {

    const input =
        document.getElementById("streetSearch");


    const result =
        document.getElementById("analysisResult");


    if (!input || !result) {

        alert("Street Intelligence system could not load.");

        return;

    }


    const street =
        input.value.trim();


    // EMPTY INPUT

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
                    Please enter a location first.
                </p>

            </div>

        `;

        return;

    }


    // ==========================================
    // DEMO INTELLIGENCE DATA
    // ==========================================

    const trafficOptions = [
        "Low",
        "Moderate",
        "High",
        "Very High"
    ];


    const airOptions = [
        "Excellent",
        "Good",
        "Moderate",
        "Poor"
    ];


    const traffic =
        trafficOptions[
            Math.floor(
                Math.random() * trafficOptions.length
            )
        ];


    const air =
        airOptions[
            Math.floor(
                Math.random() * airOptions.length
            )
        ];


    const water =
        Math.floor(
            Math.random() * 31
        ) + 70;


    const energy =
        Math.floor(
            Math.random() * 46
        ) + 50;


    const lighting =
        Math.floor(
            Math.random() * 21
        ) + 80;


    const parking =
        Math.floor(
            Math.random() * 46
        ) + 5;


    const safety =
        Math.floor(
            Math.random() * 31
        ) + 70;


    // ==========================================
    // SCORE CALCULATION
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
            "Traffic congestion is significantly elevated. Intelligent traffic optimization is recommended.";

    }

    else if (traffic === "High") {

        insight =
            "Traffic is above normal levels. Smart traffic management could improve urban mobility.";

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
            REAL-TIME APIs WILL BE CONNECTED LATER

        </div>

    `;

}


// ==========================================
// MAKE FUNCTION AVAILABLE TO HTML BUTTON
// ==========================================

window.analyzeStreet = analyzeStreet;

window.exploreCity = exploreCity;

window.closeLocation = closeLocation;

window.showLocation = showLocation;


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById("streetSearch");


        const button =
            document.querySelector(
                ".search-area button"
            );


        if (input) {

            input.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {

                        analyzeStreet();

                    }

                }
            );

        }


        if (button) {

            button.addEventListener(
                "click",
                analyzeStreet
            );

        }

    }
);
