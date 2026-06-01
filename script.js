let hrac = {
  jmeno: "HENRY",
  zivoty: 50,
  sila: 15,

  inventory: ["meč", "potion", "štít"],

  vypijLektvar: function() {
    if (this.inventory.includes("potion")) {
      this.zivoty += 20;
      if (this.zivoty > 100) this.zivoty = 100;

      let indexLektvaru = this.inventory.indexOf("potion");
      this.inventory.splice(indexLektvaru, 1);

      alert("Rytíř " + this.jmeno + " vypil lektvar. Zbývající inventář: " + this.inventory.join(", "));
    } else {
      alert("Nemáš žádný lektvar v inventáři!");
    }
  }
};

document.addEventListener("keydown", function(event) {
  if (event.key === "e" || event.key === "E") {
    hrac.vypijLektvar();
  }
});

let mujPanel = document.getElementById("tajemstvi");
alert(mujPanel);

let hlavniNadpis = document.getElementById("nadpis");

hlavniNadpis.textContent = "čAu BrO";


hlavniNadpis.style.color = "white";


hlavniNadpis.style.backgroundColor = "darkblue";