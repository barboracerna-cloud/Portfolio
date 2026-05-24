// Funkce pro kontrolu sudého/lichého čísla
let historia = [];

function kontrola() {
    const cisloInput = document.getElementById('cislo');
    const resultDiv = document.getElementById('result');
    const cislo = parseInt(cisloInput.value);

    // Validace vstupu
    if (cisloInput.value === '' || isNaN(cislo)) {
        resultDiv.className = 'error';
        resultDiv.textContent = '❌ Prosím, zadej platné číslo!';
        resultDiv.style.display = 'block';
        return;
    }

    // Kontrola sudosti/lichosti
    let zprava = '';
    let typ = '';

    if (cislo % 2 === 0) {
        zprava = `✅ Číslo ${cislo} je SUDÉ`;
        typ = 'SUDÉ';
        resultDiv.className = 'success';
    } else {
        zprava = `✅ Číslo ${cislo} je LICHÉ`;
        typ = 'LICHÉ';
        resultDiv.className = 'success';
    }

    resultDiv.textContent = zprava;
    resultDiv.style.display = 'block';

    // Uložení do historie
    const cas = new Date().toLocaleTimeString('cs-CZ');
    historia.unshift(`${cislo} → ${typ} (${cas})`);

    // Omezení historie na posledních 10 položek
    if (historia.length > 10) {
        historia.pop();
    }

    // Aktualizace historyie
    aktualizujHistorii();

    // Vyčistění inputu
    cisloInput.value = '';
    cisloInput.focus();
}

function aktualizujHistorii() {
    const historiaList = document.getElementById('historia');
    if (!historiaList) return; // Pokud nejsme na index3.html

    historiaList.innerHTML = '';
    historia.forEach(zaznam => {
        const li = document.createElement('li');
        li.textContent = zaznam;
        historiaList.appendChild(li);
    });
}

// Umožnit potvrzení pomocí Enter
document.addEventListener('DOMContentLoaded', function() {
    const cisloInput = document.getElementById('cislo');
    if (cisloInput) {
        cisloInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                kontrola();
            }
        });
    }

    console.log('✅ Script načten a aktivní');
});