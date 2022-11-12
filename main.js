import { colors } from "./helpers/colors.js";

const BASEURL = "https://pokeapi.co/api/v2/pokemon";

const contentPokemons = document.querySelector(".content__pokemons");
const options = document.querySelector(".options");

let nextPoke = null;
let previousPoke = null;

function printTypes(types) {
    return types.map(({ type: { name } }) => `
        <div class="pokemon__type-img">
                        <img src="./type/${name}.png" alt="${name}">
                    </div>
    `).join("");
}

function printPokemons(pokemons) {
    let html = "";

    pokemons.forEach(async ({ url }) => {
        const data = await fetch(url);
        const res = await data.json()

        const name = res.name;
        const img = res.sprites.other["official-artwork"].front_default;
        const type = res.types[0].type.name;

        html += `
            <div class="pokemon" style="background-color: ${colors[type]}">
                <h3>${name}</h3>
                <div class="pokemon__img">
                    <img src="${img}" alt="${name}">
                </div>
                <div class="pokemon__type">
                    ${printTypes(res.types)}
                </div>
            </div>
        `

        contentPokemons.innerHTML = html;
    });
};

options.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__previous")) {
        if (!previousPoke) {
            alert("esto es imposible")
        }
        getPersonajes(previousPoke);
    }

    if (e.target.classList.contains("btn__next")) {
        if (!nextPoke) {
            alert("esto es imposible")
        }
        getPersonajes(nextPoke);
    }
})

async function getPersonajes(url) {
    try {
        const data = await fetch(url);
        const { next, previous, results } = await data.json()

        nextPoke = next;
        previousPoke = previous;

        printPokemons(results)
    } catch (error) {
        console.log(error);
    }
}

getPersonajes(BASEURL);