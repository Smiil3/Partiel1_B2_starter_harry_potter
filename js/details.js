console.log("details.js loaded");

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('characterId');

async function getData() {
    const response = await fetch(`https://hp-api.onrender.com/api/character/${characterId}`)
    const data = await response.json()
    return data[0]
}

let data = await getData();
console.log(data);

const perso_right = document.querySelector(".perso__right");
const perso_left = document.querySelector(".perso__left");
const pageTitle = document.querySelector("h3");
const houseImage = document.querySelector(".house__perso img");
function displayCharacters() {
    pageTitle.innerHTML = data.name;
    houseImage.src = `./images/logo/${data.house}.png`;
    perso_left.innerHTML = `
        <img src="${data.image}" alt="${data.name}" />
        <figcaption>${data.actor}</figcaption>
    `;

    const attributes = [
        { label: "Gender", value: data.gender!="" ? firstUpperCase(data.gender) : "Unknown"},
        { label: "Eye", value: data.eyeColour!="" ? firstUpperCase(data.eyeColour) : "Unknown"},
        { label: "Hair", value: data.hairColour!="" ? firstUpperCase(data.hairColour) : "Unknown"},
        { label: "Date of birth", value: data.dateOfBirth!=null ? data.dateOfBirth : "Unknown" },
        { label: "Patronus", value: data.patronus!="" ? firstUpperCase(data.patronus) : "Unknown" },
    ];

    perso_right.innerHTML = `
        <div>
            <div>
                ${attributes.map(attr => `<p>${attr.label}</p>`).join('')}
            </div>
            <div>
                ${attributes.map(attr => `<p class="attr">${attr.value}</p>`).join('')}
            </div>
        </div>
    `;
}
function firstUpperCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1); 
}

displayCharacters()