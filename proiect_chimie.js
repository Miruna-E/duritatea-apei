if (window.location.pathname=="simulator.html") {
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
}

// } else if (window.location.pathname=="mod_de_lucru.html") {
// }

document.getElementById("butonTrimitereVolumEchivalenta").addEventListener("click", () => {
    
    let a = document.getElementById("volumEchivalenta").value;
    localStorage.setItem("volumEchivalenta", a);

    // //schimba ptr setAttribute
    // for (let i = volumTabel.length - 1; i > 0; i--) { //prea multe coloane
    //     if(volumTabel[i].textContent > a + 1 && volumTabel[i-1].textContent > a + 1){
    //         volumTabel[i].parentNode.removeChild(volumTabel[i]);
    //         inputTabel[i].parentNode.removeChild(inputTabel[i]);
    //     } else if(volumTabel[i].textContent > a + 1 && volumTabel[i-1].textContent > a + 1){ //prea putine coloane
    //         // <td><label for="conductivitate1,6">1,6</label></td>;
    //         let volumTabelNou = new document.createElement("td");
    //         let volumTabelNouLabel = volumTabelNou.appendChild(document.createElement("label"));
    //         volumTabelNouLabel.textContent = Number(volumTabel.lastChild.value) + 0.2;
    //         let volumTabelNouLabelFor = volumTabelNouLabel.getAttributeNode("for");
    //         volumTabelNouLabelFor.textContent = "conductivitate" + volumTabelNouLabel.textContent;
    //         volumTabelNouLabel.setAttributeNode(volumTabelNouLabelFor);
    //         volumTabel[i].parentNode.appendChild(volumTabelNou);

    //         //  <td><input class="input-tabel" type="text" id="conductivitate0" name="conductivitate0"></td>
    //         let inputTabelNou = new document.createElement("td");
    //         let inputTabelNou = inputTabelNou.appendChild(document.createElement("input"));
    //         inputTabelNou.
    //         inputTabel[i].parentNode.appendChild(inputTabelNou);
    //     }
    // }

    // console.log(volumTabel);
    // while(a + 1 > valoriTabel[valoriTabel.length - 1]){
        
    // }
});

document.getElementById("butonTrimitereTabel").addEventListener("click", () => {
    let volumTabel = document.getElementsByTagName("label");
    let inputTabel = document.getElementsByClassName("input-tabel");
    let valoriTabel = {};
    for (let i = 0; i < inputTabel.length; i++) {
        if(inputTabel[i].value != Number(inputTabel[i].value)){
            alert("Introduceti doar numere in tabel!");
            const error = new TypeError(`Tabelul contine date care nu sunt numere in coloana ${i}.`)
            console.error(error);
            return;
        }
        valoriTabel[i] = inputTabel[i].value;
    }
    localStorage.setItem("", a); //vezi ce pui
});

// window.addEventListener("load", modificaTabel);
