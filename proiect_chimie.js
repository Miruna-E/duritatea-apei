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
    }, 2000);
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
        elementSolutiePahar.style.backgroundColor = "#c55700";
        elementTextCuloare.innerText = "Echivalență! Culoare Portocalie";
        elementTextCuloare.style.color = "#ea9008";

        butonPornestePicurare.innerText = "Mai picură 1 ml (Atenție!)";
        butonPornestePicurare.style.backgroundColor = "#ea9008";

        let duritate = (2.8 * volAdg).toFixed(1);
        elementTextDuritate.innerHTML = `Duritate calculată: d<sub>tp</sub> = 2.8 × ${volAdg} = ${duritate} °dH`;
        elementTextDuritate.style.display = "block";
        elementTextDuritate.style.color = "#4ade80";
        document.getElementById("experiment-laborator").style.backgroundColor = "rgb(43, 60, 45)";

        butonResetare.style.display = "inline-block";
    }

    if (volAdg === volDepasit) {
        elementSolutiePahar.style.backgroundColor = "#671d0e";
        elementTextCuloare.innerText = "Titrarea este depășită! (Roșu)";
        elementTextCuloare.style.color = "#f6785f";

        butonPornestePicurare.innerText = "Proba compromisă";
        butonPornestePicurare.disabled = true;
        butonPornestePicurare.style.backgroundColor = "#64748b";
        document.getElementById("experiment-laborator").style.backgroundColor = "#2b2b36";

        elementTextDuritate.innerHTML = `Eroare: Ai trecut peste culoarea portocalie. Proba se aruncă și rezultatul nu se ia în considerare.`;
        elementTextDuritate.style.color = "#f6785f";
    }
}

document.getElementById("butonResetare").addEventListener("click", () => {
    picurare = 0;
    volAdg = 0;
    nivCrtLichidBiureta = pozStartLichidBiureta;
    nivCrtLichidPahar = pozStartLichidPahar;
    document.getElementById("experiment-laborator").style.backgroundColor = "#2b2b36";

    elementLichidBiureta.style.height = nivCrtLichidBiureta + "rem";
    elementSolutiePahar.style.height = nivCrtLichidPahar + "rem";
    elementSolutiePahar.style.backgroundColor = "#f2d32e";

    elementTextVolum.innerText = volAdg;
    elementTextCuloare.innerText = "Galben (Mediu neutru)";
    elementTextCuloare.style.color = "#f2d32e";

    elementTextDuritate.style.display = "none";

    butonPornestePicurare.innerText = "Picură 1 ml HCl 0.1 M";
    butonPornestePicurare.style.backgroundColor = "#3b82f6";
    butonPornestePicurare.disabled = false;
    butonResetare.style.display = "none";
});