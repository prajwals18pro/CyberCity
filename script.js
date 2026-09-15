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
