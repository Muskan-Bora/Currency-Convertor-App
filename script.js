const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
});

// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name ==="to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    let response = await fetch (URL);
    let data = await response.json();
    //console.log(data);
    let from = fromCurr.value.toLowerCase();
    //console.log(from);
    let to = toCurr.value.toLowerCase();
    //console.log(to);
    let rate = data[from][to];
    //console.log(rate);

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

const titleElement = document.getElementById("title");
const text = "Magic of Instant Conversions ";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        titleElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150); // Adjust speed by changing 100ms
    }
}

// Start the typing effect when the page loads
window.onload = () => {
    typeEffect();
};