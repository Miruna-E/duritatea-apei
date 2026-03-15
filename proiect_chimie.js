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
let picurare = 1;

document.getElementById("butonPornestePicurare").addEventListener("click", () => {
    picurare = 1;
    setInterval(function(){
        if (animatieInDesfasurare || volAdg >= volDepasit || picurare == 0) return;

        animatieInDesfasurare = true;
        butonPornestePicurare.disabled = true;

        nivCrtLichidBiureta -= unitPerMililitruBiureta;
        elementLichidBiureta.style.height = nivCrtLichidBiureta + "rem";

        elementPicatura.classList.remove("animatie-cadere");
        void elementPicatura.offsetWidth;
        elementPicatura.classList.add("animatie-cadere");

        setTimeout(() => {
            actualizeazaNivPaharSiVerifPctEchiv();
            animatieInDesfasurare = false;
            if (volAdg < volDepasit) {
                butonPornestePicurare.disabled = false;
            }
        }, 400);
    }, 400);
});

document.getElementById("butonOprestePicurare").addEventListener("click", () => {
    picurare = 0;
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

        butonPornestePicurare.innerText = "Mai picură 1 ml (Atenție!)";
        butonPornestePicurare.style.backgroundColor = "#eab308";

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

        butonPornestePicurare.innerText = "Proba compromisă";
        butonPornestePicurare.disabled = true;
        butonPornestePicurare.style.backgroundColor = "#64748b";

        elementTextDuritate.innerHTML = `Eroare: Ai trecut peste culoarea portocalie. Proba se aruncă și rezultatul nu se ia în considerare.`;
        elementTextDuritate.style.color = "#ef4444";
    }
}

document.getElementById("butonResetare").addEventListener("click", () => {
    picurare = 0;
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

    butonPornestePicurare.innerText = "Picură 1 ml HCl 0.1 M";
    butonPornestePicurare.style.backgroundColor = "#3b82f6";
    butonPornestePicurare.disabled = false;
    butonResetare.style.display = "none";
});