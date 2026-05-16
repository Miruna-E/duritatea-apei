if (window.location.pathname=="/simulator.html") {
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
const textCuloareSolutiePahar = document.getElementById("textCuloareSolutiePahar");
const elementTextDuritate = document.getElementById("elementTextDuritate");
let picurare = 1;
let intervalPicurare;

document.getElementById("butonPornestePicurare").addEventListener("click", () => {
    picurare = 1;
    clearInterval(intervalPicurare);
    intervalPicurare = setInterval(function(){
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
            } else {
                clearInterval(intervalPicurare);
            }
        }, 400);
    }, 2000);
});

document.getElementById("butonOprestePicurare").addEventListener("click", () => {
    picurare = 0;
    clearInterval(intervalPicurare);
});

document.getElementById("butonResetare").addEventListener("click", () => {
    picurare = 0;
    clearInterval(intervalPicurare);
    volAdg = 0;
    nivCrtLichidBiureta = pozStartLichidBiureta;
    nivCrtLichidPahar = pozStartLichidPahar;

    elementLichidBiureta.style.height = nivCrtLichidBiureta + "rem";
    elementSolutiePahar.style.height = nivCrtLichidPahar + "rem";
    elementSolutiePahar.style.backgroundColor = "rgb(242, 211, 46)";

    elementTextVolum.innerText = volAdg;
    textCuloareSolutiePahar.innerText = "Galben (Mediu neutru)";
    textCuloareSolutiePahar.style.color = "rgb(242, 211, 46)";

    elementTextDuritate.style.display = "none";
    document.getElementById("experiment-laborator").style.backgroundColor = "rgb(43, 43, 54)";

    butonPornestePicurare.innerText = "Picură 1 ml HCl 0.1 M";
    butonPornestePicurare.style.backgroundColor = "rgb(59, 130, 246)";
    butonPornestePicurare.disabled = false;
    butonResetare.style.display = "none";
});

function actualizeazaNivPaharSiVerifPctEchiv() {
    volAdg += 1;

    nivCrtLichidPahar += unitPerMililitruPahar;
    elementSolutiePahar.style.height = nivCrtLichidPahar + "rem";

    elementTextVolum.innerText = volAdg;

    if (volAdg === volPctEchiv) {
        elementSolutiePahar.style.backgroundColor = "rgb(197, 87, 0)";
        textCuloareSolutiePahar.innerText = "Echivalență! Culoare Portocalie";
        textCuloareSolutiePahar.style.color = "rgb(234, 144, 8)";

        butonPornestePicurare.innerText = "Mai picură 1 ml (Atenție!)";
        butonPornestePicurare.style.backgroundColor = "rgb(234, 144, 8)";

        let duritate = (2.8 * volAdg).toFixed(1);
        elementTextDuritate.innerHTML = `Duritate calculată: d<sub>tp</sub> = 2.8 × ${volAdg} = ${duritate} °dH`;
        elementTextDuritate.style.display = "block";
        elementTextDuritate.style.color = "rgb(136, 218, 125)";
        document.getElementById("experiment-laborator").style.backgroundColor = "rgb(43, 60, 45)";

        butonResetare.style.display = "inline-block";
    }

    if (volAdg === volDepasit) {
        elementSolutiePahar.style.backgroundColor = "rgb(103, 29, 14)";
        textCuloareSolutiePahar.innerText = "Titrarea este depășită! (Roșu)";
        textCuloareSolutiePahar.style.color = "rgb(246, 120, 95)";

        butonPornestePicurare.innerText = "Proba compromisă";
        butonPornestePicurare.disabled = true;
        butonPornestePicurare.style.backgroundColor = "rgb(100, 116, 139)";
        document.getElementById("experiment-laborator").style.backgroundColor = "rgb(43, 43, 54)";

        elementTextDuritate.innerHTML = `Eroare: Ai trecut peste culoarea portocalie. Proba se aruncă și rezultatul nu se ia în considerare.`;
        elementTextDuritate.style.color = "rgb(246, 120, 95)";
        clearInterval(intervalPicurare);
    }
}
}

if (window.location.pathname=="/mod_de_lucru.html") {
let volumeAlaturateDiferenta = 0.2;
let nrVolumTabel = [];

let volumTabel = document.getElementById("tabel-conductometrica").getElementsByTagName("label"); 
for(let i = 0; i < volumTabel.length; i++){
    nrVolumTabel[i] = Number(volumTabel[i].dataset.nrvolum);
}
localStorage.setItem("nrVolumTabel", nrVolumTabel);

document.getElementById("butonTrimitereVolumEchivalenta").addEventListener("click", () => {
    //=> ultimul volum din tabel este a+1 sau primul multiplu de 0.2 > a+1
    let a = document.getElementById("volumEchivalenta").value;
    if(a != Number(a)){
        alert("\"a\" trebuie sa fie un numar!");
        const error = new TypeError(`Valoarea atribuita lui a nu este un numar!`)
        console.error(error);
        return;
    } else if(Number(a) < 0){
        alert("\"a\" trebuie sa fie > 0!");
        const error = new RangeError(`Valoarea atribuita lui a nu este pozitiva!`)
        console.error(error);
        return;
    }
    a = Number(a);
    localStorage.setItem("volumEchivalenta", a);

    let casuteVolumTabel = document.getElementsByTagName("tr")[0].getElementsByTagName("td"); //=> nu include header
    //initial, ultimul element este: <td><label for="conductivitate1.6" data-nrvolum="1.6">1,6</label></td>
    let casuteInputTabel = document.getElementsByTagName("tr")[1].getElementsByTagName("td"); //=> nu include header
    //initial, ultimul element este: <td><input class="input-tabel" type="text" id="conductivitate1.6" name="conductivitate1.6"></td>

    let randVolumTabel = document.getElementsByTagName("tr")[0];
    let randInputTabel = document.getElementsByTagName("tr")[1];
    let inputTabel = document.getElementsByClassName("input-tabel"); //cu tag <input>

    for (let i = volumTabel.length - 1; Number(volumTabel[i].dataset.nrvolum) > (a + 1) && Number(volumTabel[i-1].dataset.nrvolum >= (a + 1)) && i > 0; i--) { //sterge casute din tabel
        volumTabel[i].parentNode.removeChild(volumTabel[i]);
        inputTabel[i].parentNode.removeChild(inputTabel[i]);
        casuteInputTabel[i].parentNode.removeChild(casuteInputTabel[i]);
        casuteVolumTabel[i].parentNode.removeChild(casuteVolumTabel[i]);
    }
    for (let i = volumTabel.length - 1; Number(volumTabel[i].dataset.nrvolum) < (a + 1) && i > 0; i = volumTabel.length - 1) { //adauga casute in tabel
        let casutaVolumTabelNou = document.createElement("td");
        let casutaVolumTabelNouLabel = document.createElement("label");
        let valoareVolumTabelNou = Math.round((Number(volumTabel[i].dataset.nrvolum) + volumeAlaturateDiferenta) * 100)/100;
        casutaVolumTabelNouLabel.setAttribute("data-nrvolum", String(Number(volumTabel[i].dataset.nrvolum) + volumeAlaturateDiferenta));
        casutaVolumTabelNouLabel.setAttribute("data-nrvolum", String(valoareVolumTabelNou));
        casutaVolumTabelNouLabel.setAttribute("for", "conductivitate" + casutaVolumTabelNouLabel.getAttribute("data-nrvolum"));
        casutaVolumTabelNouLabel.textContent = casutaVolumTabelNouLabel.dataset.nrvolum;
        casutaVolumTabelNouLabel.textContent = casutaVolumTabelNouLabel.textContent.replace(".", ","); //initial cu "." pentru a converti usor din string in number

        casutaVolumTabelNou.appendChild(casutaVolumTabelNouLabel);
        randVolumTabel.appendChild(casutaVolumTabelNou);

        let casutaInputTabelNou = document.createElement("td");
        let casutaInputTabelNouInput = document.createElement("input");
        casutaInputTabelNouInput.setAttribute("class", "input-tabel");
        casutaInputTabelNouInput.setAttribute("type", "text");
        casutaInputTabelNouInput.setAttribute("id", casutaVolumTabelNouLabel.getAttribute("for"));
        casutaInputTabelNouInput.setAttribute("name", casutaInputTabelNouInput.getAttribute("id"));

        casutaInputTabelNou.appendChild(casutaInputTabelNouInput);
        randInputTabel.appendChild(casutaInputTabelNou);
    }

    //se schimba volumTabel => schimb si nrVolumTabel
    volumTabel = document.getElementById("tabel-conductometrica").getElementsByTagName("label"); 
    for(let i = 0; i < volumTabel.length; i++){
        nrVolumTabel[i] = Number(volumTabel[i].dataset.nrvolum);
    }
    localStorage.setItem("nrVolumTabel", nrVolumTabel);
});

document.getElementById("butonTrimitereTabel").addEventListener("click", () => {
    document.getElementById("mesaj-grafic").style.display = "none";
    document.getElementById("loc-grafic").style.display = "block";
    let inputTabel = document.getElementsByClassName("input-tabel");
    let valoriTabel = {};
    for (let i = 0; i < inputTabel.length; i++) {
        if(inputTabel[i].value != Number(inputTabel[i].value)){
            alert(`Introduceti doar numere in tabel (verificati coloana ${i})!`);
            const error = new TypeError(`Tabelul contine date care nu sunt numere in coloana ${i}.`)
            console.error(error);
            return;
        }
        valoriTabel[i] = Number(inputTabel[i].value);
    }
    localStorage.setItem("dateTabelConductometricaString", JSON.stringify(valoriTabel)); //array stocat ca string pentru a folosi un singur spatiu de memorie
    let dateTabelConductometricaString = localStorage.getItem("dateTabelConductometricaString");
    let dateTabelConductometrica = JSON.parse(dateTabelConductometricaString);
    dateTabelConductometrica = Object.values(dateTabelConductometrica);

    const graficConductometrica = new Chart("graficConductometrica", {
        type: "line",
        data: {
            labels: nrVolumTabel,
            datasets: [{
                label: "Dependența conductivitate specifică în funcție de volumul titrant",
                backgroundColor: "rgb(0, 134, 146)",
                borderColor: "rgb(0, 134, 146)",
                pointBackgroundColor: "rgb(253, 224, 71)",
                pointBorderColor: "rgb(232, 200, 40)",
                borderWidth: 1.4,
                data: dateTabelConductometrica
            }],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "rgb(245, 245, 245)",
                        font: {
                            size: 16,
                        }
                    }
                }
            },
            scales: { //axele Ox, Oy
                x: {
                    grid: {
                        color: "rgba(0, 87, 122, 0.4)",
                    },
                    ticks: { //scrisul de langa axe
                        color: "rgb(245, 245, 245)",
                        font: {
                            size: 16,
                        },
                        beginAtZero: true,
                    }
                },
                y: {
                    grid: {
                        color: "rgba(0, 87, 122, 0.4)",
                    },
                    ticks: {
                        color: "rgb(245, 245, 245)",
                        font: {
                            size: 16,
                        },
                        beginAtZero: true,
                    }
                }
            }
        },
    });
});
}