let volAdg = 0;
const volPctEchiv = 3;
const volDepasit = 4;

const pozStartLichidBiureta = 13.125;
const pozStartLichidPahar = 1.5625;
let nivCrtLichidBiureta = pozStartLichidBiureta;
let nivCrtLichidPahar = pozStartLichidPahar;
const unitPerMililitruBiureta = 0.9375;
const unitPerMililitruPahar = 0.1875;
let animatieInDesfasurare = false;

const elementPicatura = document.getElementById("elementPicatura");
const elementSolutiePahar = document.getElementById("elementSolutiePahar");
const elementLichidBiureta = document.getElementById("elementLichidBiureta");
const elementTextVolum = document.getElementById("elementTextVolum");
const elementTextCuloare = document.getElementById("elementTextCuloare");
const elementTextDuritate = document.getElementById("elementTextDuritate");

document.getElementById("butonAdaugaPicatura").addEventListener("click", () => {
    if (animatieInDesfasurare || volAdg >= volDepasit) return;

    animatieInDesfasurare = true;
    butonAdaugaPicatura.disabled = true;

    nivCrtLichidBiureta -= unitPerMililitruBiureta;
    elementLichidBiureta.style.height = nivCrtLichidBiureta + "rem";

    elementPicatura.classList.remove("animatie-cadere");
    void elementPicatura.offsetWidth;
    elementPicatura.classList.add("animatie-cadere");

    setTimeout(() => {
        actualizeazaNivPaharSiVerifPctEchiv();
        animatieInDesfasurare = false;
        if (volAdg < volDepasit) {
            butonAdaugaPicatura.disabled = false;
        }
    }, 400);
});

function actualizeazaNivPaharSiVerifPctEchiv() {
    volAdg += 1;

    nivCrtLichidPahar += unitPerMililitruPahar;
    elementSolutiePahar.style.height = nivCrtLichidPahar + "rem";

    elementTextVolum.innerText = volAdg;

    if (volAdg === volPctEchiv) {
        elementSolutiePahar.style.backgroundColor = "#fb923c";
        elementTextCuloare.innerText = "Echivalență! Culoare Portocalie";
        elementTextCuloare.style.color = "#fb923c";

        butonAdaugaPicatura.innerText = "Mai picură 1 ml (Atenție!)";
        butonAdaugaPicatura.style.backgroundColor = "#eab308";

        let duritate = (2.8 * volAdg).toFixed(1);
        elementTextDuritate.innerHTML = `Duritate calculată: d<sub>tp</sub> = 2.8 × ${volAdg} = ${duritate} °dH`;
        elementTextDuritate.style.display = "block";
        elementTextDuritate.style.color = "#4ade80";

        butonResetare.style.display = "inline-block";
    }

    if (volAdg === volDepasit) {
        elementSolutiePahar.style.backgroundColor = "#ef4444";
        elementTextCuloare.innerText = "Titrarea este depășită! (Roșu)";
        elementTextCuloare.style.color = "#ef4444";

        butonAdaugaPicatura.innerText = "Proba compromisă";
        butonAdaugaPicatura.disabled = true;
        butonAdaugaPicatura.style.backgroundColor = "#64748b";

        elementTextDuritate.innerHTML = `Eroare: Ai trecut peste culoarea portocalie. Proba se aruncă și rezultatul nu se ia în considerare.`;
        elementTextDuritate.style.color = "#ef4444";
    }
}

document.getElementById("butonResetare").addEventListener("click", () => {
    volAdg = 0;
    nivCrtLichidBiureta = pozStartLichidBiureta;
    nivCrtLichidPahar = pozStartLichidPahar;

    elementLichidBiureta.style.height = nivCrtLichidBiureta + "rem";
    elementSolutiePahar.style.height = nivCrtLichidPahar + "rem";
    elementSolutiePahar.style.backgroundColor = "#fde047";

    elementTextVolum.innerText = volAdg;
    elementTextCuloare.innerText = "Galben (Mediu neutru)";
    elementTextCuloare.style.color = "#fde047";

    elementTextDuritate.style.display = "none";

    butonAdaugaPicatura.innerText = "Picură 1 ml HCl 0.1 M";
    butonAdaugaPicatura.style.backgroundColor = "#3b82f6";
    butonAdaugaPicatura.disabled = false;
    butonResetare.style.display = "none";
});