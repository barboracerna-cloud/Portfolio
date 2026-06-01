// Stav hry
let susenky = 0;
let silaKliknuti = 1;

let cenaBabicka = 10;
let cenaTovarna = 50;

// Načtení elementů z HTML
let textSkore = document.getElementById("skore");
let btnSusenka = document.getElementById("btn-susenka");
let btnBabicka = document.getElementById("btn-babicka");
let btnTovarna = document.getElementById("btn-tovarna");
let btnZlata = document.getElementById("btn-zlata");
let textVysledekZlata = document.getElementById("vysledek-zlata");
let sekceObchod = document.getElementById("obchod-sekce");

// Společná funkce pro aktualizaci rozhraní
function aktualizujHru() {
    textSkore.textContent = susenky;
    
    // 1. Změna nadpisu v záložce prohlížeče
    document.title = `🍪 ${susenky} sušenek`;

    // 2. Odemknutí obchodu, pokud má hráč alespoň 10 sušenek
    if (susenky >= 10) {
        sekceObchod.classList.remove("skryty");
    }
}

// Klikání na hlavní velkou sušenku
btnSusenka.addEventListener("click", function() {
    susenky += silaKliknuti;
    aktualizujHru();
});

// Risk management (Zlatá sušenka pod hlavní sušenkou)
btnZlata.addEventListener("click", function() {
    let sance = Math.random(); // Náhodné číslo mezi 0 a 1
    
    if (sance < 0.5) {
        // Výhra 50%
        susenky += 100;
        textVysledekZlata.textContent = " Super! Přídělek 100 sušenek!";
        textVysledekZlata.style.color = "#27ae60";
    } else {
        // Prohra 50%
        susenky -= 50;
        if (susenky < 0) {
            susenky = 0; // Skóre nesmí jít pod nulu
        }
        textVysledekZlata.textContent = " Smůla! Ztáta 50 sušenek.";
        textVysledekZlata.style.color = "#c0392b";
    }
    
    aktualizujHru();
});

// Nákup babičky v obchodě
btnBabicka.addEventListener("click", function() {
    if (susenky >= cenaBabicka) {
        susenky -= cenaBabicka;
        silaKliknuti++; // Babička zvětší sílu kliku
        
        cenaBabicka += 10; // Zvýšení ceny pro příště
        btnBabicka.innerHTML = `
            <span class="nazev"> Najmout Babičku</span>
            <span class="cena">Cena: ${cenaBabicka} sušenek</span>
        `;
        aktualizujHru();
    } else {
        alert("Nedostatek sušenek!");
    }
});

// Nákup továrny v obchodě
btnTovarna.addEventListener("click", function() {
    if (susenky >= cenaTovarna) {
        susenky -= cenaTovarna;
        
        cenaTovarna += 50; // Zvýšení ceny pro příště
        btnTovarna.innerHTML = `
            <span class="nazev"> Koupit Továrnu</span>
            <span class="cena">Cena: ${cenaTovarna} sušenek</span>
        `;
        
        aktualizujHru();

        // Každou sekundu automaticky přičte jednu sušenku
        setInterval(function() {
            susenky++;
            aktualizujHru();
        }, 1000);
    } else {
        alert("Nedostatek sušenek!");
    }
});