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

// 2.1 Tabelle
const tabellenInhalt = document.getElementById("emissions-tabelle");


// Radio buttons – Sortierung
// Sortierung von Ländern nach A-Z
const sortLandAZ = document.querySelector("#land");
if(sortLandAZ !== null) {
    sortLandAZ.addEventListener("change", function() {
        emissionsdaten.sort(function(a, b) {
            return a.land.localeCompare(b.land);
        });
        filterAnwenden(emissionsdaten);
    });
};

// Sortierung von Unternehmen nach A-Z
const sortUnternehmenAZ = document.querySelector("#unternehmen");
if(sortUnternehmenAZ !== null) {
    sortUnternehmenAZ.addEventListener("change", function() {
        emissionsdaten.sort(function(a, b) {
            return a.unternehmen.localeCompare(b.unternehmen);
        });
        filterAnwenden(emissionsdaten);
    });
}

// Sortierung von Emissionsdaten absteigend
const emissionenAbsteigend = document.querySelector("#emissionen-ab");
if(emissionenAbsteigend !== null) {
    emissionenAbsteigend.addEventListener("change", function() {
        emissionsdaten.sort(function(a, b) {
            return b.emissionen - a.emissionen;
        });
        filterAnwenden(emissionsdaten);
    });
}

// Sortierung von Emissionsdaten aufsteigend
const emissionenAufsteigend = document.querySelector("#emissionen-auf");
if(emissionenAufsteigend !== null) {
    emissionenAufsteigend.addEventListener("change", function() {
        emissionsdaten.sort(function(a, b) {
            return a.emissionen - b.emissionen;
        });
        filterAnwenden(emissionsdaten);
    });
}


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
if(länderAuswahl !== null) {
    länderAuswahl.addEventListener("change", function() {
        filterAnwenden(emissionsdaten);
    });
};
if(unternehmensFilter !== null) {
    unternehmensFilter.addEventListener("input", function() {
    filterAnwenden(emissionsdaten);
    });
};


//2.2 Übersichtsseite
const emissionsreichstenUnternehmen = document.querySelector("#karte-emissionsreichsten-unternehmen");
const emissionsärmstenUnternehmen = document.querySelector("#karte-emissionsärmsten-unternehmen");
const emissionsreichstenLänder = document.querySelector("#karte-emissionsreichsten-laender");
const emissionsärmstenLänder = document.querySelector("#karte-emissionsärmsten-laender");

//Datensatz für emissionsreichsten Unternehmen
if (emissionsreichstenUnternehmen !== null) {
    const datenSatzMaxUnternehmenKomplett = emissionsdaten.sort(function(a, b) {
        return b.emissionen - a.emissionen;
    });
    const datenSatzMaxU = datenSatzMaxUnternehmenKomplett.slice(0, 5);
    kartenErstellenHöchstUnternehmen(datenSatzMaxU);
};

//Datensatz für emissionsärmsten Unternehmen
if (emissionsärmstenUnternehmen !== null) {
    const datenSatzMinUnternehmenKomplett = emissionsdaten.sort(function(a, b) {
        return a.emissionen - b.emissionen;
    });
    const datenSatzMinU = datenSatzMinUnternehmenKomplett.slice(0, 5);
    kartenErstellenÄrmstUnternehmen(datenSatzMinU);
};

//Array für Länder und Gesamtemissionen
const länderEmissionen = [];

for (const daten of emissionsdaten) {
    //Auf vorherige Speicherung prüfen
    const landVorhanden = länderEmissionen.some(function(land) {
        return land.land === daten.land;
    });

    if (!landVorhanden) {
        //Unternehmen des aktuellen Landes finden
        const unternehmenDesLandes = emissionsdaten.filter(function(unternehmen) {
            return unternehmen.land === daten.land;
        });

        //Emissionen Unternehmen addieren
        let gesamtEmissionen = 0;
        for (const unternehmen of unternehmenDesLandes) {
            gesamtEmissionen += unternehmen.emissionen;
        };

        //Land mit Gesamtemissionen im neuen Array speichern
        länderEmissionen.push({
            land: daten.land,
            emissionen: gesamtEmissionen
        });
    };
};

//Datensatz für Emissionsreichste Länder
if (emissionsreichstenLänder !== null) {
    const datenSatzMaxLänderKomplett = länderEmissionen.sort(function(a, b) {
        return b.emissionen - a.emissionen;
    });
    const datenSatzMaxL = datenSatzMaxLänderKomplett.slice(0, 3);
    kartenErstellenHöchstLänder(datenSatzMaxL);
};

//Datensatz für Emissionsärmste Länder
if (emissionsärmstenLänder !== null) {
    const datenSatzMinLänderKomplett = länderEmissionen.sort(function(a, b) {
        return a.emissionen - b.emissionen;
    });
    const datenSatzMinL = datenSatzMinLänderKomplett.slice(0, 3);
    kartenErstellenÄrmstLänder(datenSatzMinL);
};

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

// 4. Darstellung der Übersichtsseite
function kartenErstellenHöchstUnternehmen(datensatz) {
    if (emissionsreichstenUnternehmen !== null) {
        let number = 1;
        for (const daten of datensatz) {
            const container = document.createElement("div");
            const überschrift = document.createElement("h4");
            const standort = document.createElement("p");
            const emissionsBereich = document.createElement("p");

            überschrift.textContent = number + ". " + daten.unternehmen;

            standort.textContent = "Standort: " + daten.land + ".";
            emissionsBereich.textContent = "Jährliche Emissionen: " + daten.emissionen + "t CO2.";

            container.appendChild(überschrift);
            container.appendChild(standort);
            container.appendChild(emissionsBereich);

            emissionsreichstenUnternehmen.appendChild(container);

            number += 1;
        };
    };
};

function kartenErstellenÄrmstUnternehmen(datensatz) {
    if (emissionsärmstenUnternehmen !== null) {
        let number = 1;
        for (const daten of datensatz) {
            const container = document.createElement("div");
            const überschrift = document.createElement("h4");
            const standort = document.createElement("p");
            const emissionsBereich = document.createElement("p");

            überschrift.textContent = number + ". " + daten.unternehmen;

            standort.textContent = "Standort: " + daten.land + ".";
            emissionsBereich.textContent = "Jährliche Emissionen: " + daten.emissionen + "t CO2.";

            container.appendChild(überschrift);
            container.appendChild(standort);
            container.appendChild(emissionsBereich);

            emissionsärmstenUnternehmen.appendChild(container);

            number += 1;
        };
    };
};

function kartenErstellenHöchstLänder(datensatz) {
    if (emissionsreichstenLänder !== null) {
        let number = 1;
        for (const daten of datensatz) {
            const container = document.createElement("div");
            const überschrift = document.createElement("h4");
            const emissionsBereich = document.createElement("p");
            const hauptverursacher = document.createElement("p");

            // Filterung
            const unternehmenDesLandes = emissionsdaten.filter(function(unternehmen) {
                return unternehmen.land === daten.land
            });
            //Sortierung
            unternehmenDesLandes.sort(function(a, b) {
                return b.emissionen - a.emissionen;
            });

            //Ausgabe
            überschrift.textContent = number + ". " + daten.land;
            emissionsBereich.textContent = "Gesamtemissionen: " + daten.emissionen + "t CO2.";
            hauptverursacher.textContent = 
                "Emissionreichstes Unternehmen: " + unternehmenDesLandes[0].unternehmen +
                " mit " + unternehmenDesLandes[0].emissionen + "t CO2/Jahr."
            ;

            container.appendChild(überschrift);
            container.appendChild(emissionsBereich);
            container.appendChild(hauptverursacher);

            emissionsreichstenLänder.appendChild(container);

            number += 1;
        };
    };
};

function kartenErstellenÄrmstLänder(datensatz) {
    if (emissionsärmstenLänder !== null) {
        let number = 1;
        for (const daten of datensatz) {
            const container = document.createElement("div");
            const überschrift = document.createElement("h4");
            const emissionsBereich = document.createElement("p");
            const hauptverursacher = document.createElement("p");

            // Filterung
            const unternehmenDesLandes = emissionsdaten.filter(function(unternehmen) {
                return unternehmen.land === daten.land
            });
            //Sortierung
            unternehmenDesLandes.sort(function(a, b) {
                return b.emissionen - a.emissionen;
            });

            //Ausgabe
            überschrift.textContent = number + ". " + daten.land;
            emissionsBereich.textContent = "Gesamtemissionen: " + daten.emissionen + "t CO2.";
            hauptverursacher.textContent = 
                "Emissionreichstes Unternehmen: " + unternehmenDesLandes[0].unternehmen +
                " mit " + unternehmenDesLandes[0].emissionen + "t CO2/Jahr."
            ;
            
            container.appendChild(überschrift);
            container.appendChild(emissionsBereich);
            container.appendChild(hauptverursacher);

            emissionsärmstenLänder.appendChild(container);

            number += 1;
        };
    };
};


// 5. Schreibrichtung im Footer
const schreibrichtung = document.querySelector("#schreibrichtung");

if (schreibrichtung !== null) {
    schreibrichtung.addEventListener("change", function() {
        const menueBereich = document.querySelector(".uebersicht-menue-content");

        if (menueBereich !== null) {
            menueBereich.dir = schreibrichtung.value;
        }
    });
}