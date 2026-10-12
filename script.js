// 1. Datenspeicherung
const emissionsdaten = [
    { unternehmen: "Veltrion Industries", land: "Deutschland", emissionen: 1250000 },
    { unternehmen: "Novaris Energy", land: "USA", emissionen: 2850000 },
    { unternehmen: "Altrion Systems", land: "Frankreich", emissionen: 420000 },
    { unternehmen: "Zentora Manufacturing", land: "China", emissionen: 3750000 },
    { unternehmen: "Ecoventra Solutions", land: "Schweden", emissionen: 85000 },
    { unternehmen: "Terralux Industries", land: "Deutschland", emissionen: 980000 },
    { unternehmen: "Cryonex Technologies", land: "Japan", emissionen: 560000 },
    { unternehmen: "Magnora Steelworks", land: "Indien", emissionen: 4200000 },
    { unternehmen: "Solvantis Group", land: "Kanada", emissionen: 310000 },
    { unternehmen: "Bravion Logistics", land: "USA", emissionen: 1750000 },
    { unternehmen: "Orvexa Chemicals", land: "China", emissionen: 3100000 },
    { unternehmen: "Lumetrix Solutions", land: "Schweden", emissionen: 45000 },
    { unternehmen: "Axentis Manufacturing", land: "Deutschland", emissionen: 1420000 },
    { unternehmen: "Virexon Energy", land: "Indien", emissionen: 2950000 },
    { unternehmen: "Nexoria Technologies", land: "Frankreich", emissionen: 180000 },
    { unternehmen: "Polaristra Industries", land: "Japan", emissionen: 890000 },
    { unternehmen: "Trivanta Resources", land: "Brasilien", emissionen: 1650000 },
    { unternehmen: "Elvaris Systems", land: "Kanada", emissionen: 120000 },
    { unternehmen: "Korvex Manufacturing", land: "China", emissionen: 4650000 },
    { unternehmen: "Aurevia Solutions", land: "Schweden", emissionen: 32000 },
    { unternehmen: "Ventaris Logistics", land: "USA", emissionen: 1120000 },
    { unternehmen: "Omnexa Industries", land: "Indien", emissionen: 3500000 },
    { unternehmen: "Caltrix Energy", land: "Brasilien", emissionen: 2100000 },
    { unternehmen: "Zyphora Technologies", land: "Frankreich", emissionen: 95000 },
    { unternehmen: "Meridianex Group", land: "Deutschland", emissionen: 670000 },
    { unternehmen: "Quantaris Systems", land: "Japan", emissionen: 240000 },
    { unternehmen: "Helvion Industries", land: "Kanada", emissionen: 490000 },
    { unternehmen: "Draxora Manufacturing", land: "China", emissionen: 5100000 },
    { unternehmen: "Sylvexa Solutions", land: "Schweden", emissionen: 18000 },
    { unternehmen: "Torvantis Resources", land: "Brasilien", emissionen: 780000 }
];


// 2. Datenverarbeitung
const tabellenInhalt = document.getElementById("emissions-tabelle");


// Radio buttons – Sortierung
// Sortierung von Ländern nach A-Z
const sortLandAZ = document.querySelector("#land");
sortLandAZ.addEventListener("change", function() {
    emissionsdaten.sort(function(a, b) {
        return a.land.localeCompare(b.land);
    });
    filterAnwenden(emissionsdaten);
});

// Sortierung von Unternehmen nach A-Z
const sortUnternehmenAZ = document.querySelector("#unternehmen");
sortUnternehmenAZ.addEventListener("change", function() {
    emissionsdaten.sort(function(a, b) {
        return a.unternehmen.localeCompare(b.unternehmen);
    });
    filterAnwenden(emissionsdaten);
});

// Sortierung von Emissionsdaten absteigend
const emissionenAbsteigend = document.querySelector("#emissionen-ab");
emissionenAbsteigend.addEventListener("change", function() {
    emissionsdaten.sort(function(a, b) {
        return b.emissionen - a.emissionen;
    });
    filterAnwenden(emissionsdaten);
});

// Sortierung von Emissionsdaten aufsteigend
const emissionenAufsteigend = document.querySelector("#emissionen-auf");
emissionenAufsteigend.addEventListener("change", function() {
    emissionsdaten.sort(function(a, b) {
        return a.emissionen - b.emissionen;
    });
    filterAnwenden(emissionsdaten);
});


// Filtern
// Definitionen
const länderAuswahl = document.querySelector("#land-select");
const unternehmensFilter = document.querySelector("#unternehmens-suche");

//Filterfunktion
function filterAnwenden(wert) {
    let gefilterteDaten = wert;
    
    gefilterteDaten = gefilterteDaten.filter(function(daten) {
        return länderAuswahl.value === "alle" || daten.land === länderAuswahl.value;
    });
    gefilterteDaten = gefilterteDaten.filter(function(daten) {
        return daten.unternehmen.toLowerCase().includes(unternehmensFilter.value.toLowerCase());
    });
    tabelleAufrufen(gefilterteDaten);
};

//Filterauslöser
länderAuswahl.addEventListener("change", function() {
    filterAnwenden(emissionsdaten);
});
unternehmensFilter.addEventListener("input", function() {
    filterAnwenden(emissionsdaten);
});



// 3. Darstellung der Tabelle
function tabelleAufrufen(datensatz) {
    if (tabellenInhalt !== null) {
        tabellenInhalt.replaceChildren();
        for (const daten of datensatz) {
            const zeile = document.createElement("tr");

            const unternehmen = document.createElement("td");
            const land = document.createElement("td");
            const emissionen = document.createElement("td");

            unternehmen.textContent = daten.unternehmen;
            land.textContent = daten.land;
            emissionen.textContent = daten.emissionen;

            zeile.appendChild(unternehmen);
            zeile.appendChild(land);
            zeile.appendChild(emissionen);

            tabellenInhalt.appendChild(zeile);
        };
    };
};

tabelleAufrufen(emissionsdaten);

// 4. Übersichtsseite