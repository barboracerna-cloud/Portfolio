// Stav hry
let susenky = 0;
let silaKliknuti = 1;

let cenaBabicka = 10;
let cenaTovarna = 50;

// Elementy
let textSkore = document.getElementById("skore");
let btnSusenka = document.getElementById("btn-susenka");
let btnBabicka = document.getElementById("btn-babicka");
let btnTovarna = document.getElementById("btn-tovarna");

// Klikání na sušenku
btnSusenka.addEventListener("click", function() {
    susenky += silaKliknuti;
    textSkore.textContent = susenky;
});

// Nákup babičky
btnBabicka.addEventListener("click", function() {
    if (susenky >= cenaBabicka) {
        susenky -= cenaBabicka;
        silaKliknuti++;
        
        textSkore.textContent = susenky;
        
        cenaBabicka += 10;
        // Aktualizuje text tak, aby zůstala zachovaná struktura
        btnBabicka.innerHTML = `
            <span class="nazev">👵 Najmout Babičku</span>
            <span class="cena">Cena: ${cenaBabicka} sušenek</span>
        `;
    } else {
        alert("Nedostatek sušenek!");
    }
});

// Nákup továrny
btnTovarna.addEventListener("click", function() {
    if (susenky >= cenaTovarna) {
        susenky -= cenaTovarna;
        textSkore.textContent = susenky;
        
        cenaTovarna += 50;
        btnTovarna.innerHTML = `
            <span class="nazev">🏭 Koupit Továrnu</span>
            <span class="cena">Cena: ${cenaTovarna} sušenek</span>
        `;
        
        // Automatické přidávání
        setInterval(function() {
            susenky++;
            textSkore.textContent = susenky;
        }, 1000);
    } else {
        alert("Nedostatek sušenek!");
    }
});