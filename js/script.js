let charactersClass = document.querySelector(".characters");

async function getData() {
    const response = await fetch(`https://hp-api.onrender.com/api/characters`)
    const data = await response.json()
    return data.slice(0, 12);
}

let data = await getData();
console.log(data);

function displayCharacters(dataToDisplay = data) {
    charactersClass.innerHTML = dataToDisplay.map(character => {
        return `
          <div>
            <a href="details.html?characterId=${character.id}"> <img class="${character.house.toLowerCase()}" src="${character.image}" alt="${character.name}"/></a>
            <p>${character.name}</p>
          </div>
        `
    }).join("");
}

displayCharacters();

const houses = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];
let currentFilter = null;

houses.forEach(house => {
    document.querySelector(`#${house}`).addEventListener("click", () => {
        if (currentFilter === house) {
            displayCharacters();
            currentFilter = null;
        } else {
            displayCharacters(data.filter(character => character.house.toLowerCase() === house));
            currentFilter = house;
        }
    });
});