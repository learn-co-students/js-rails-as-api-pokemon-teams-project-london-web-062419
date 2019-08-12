const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

///API CALLS//////////////
const fetchAllTrainersRequest = () => {
    fetch(TRAINERS_URL)  // fetching all the trainers
        .then(resp => resp.json())
        .then(allTrainers => {
            renderAllTrainers(allTrainers);
        });
};

const releasePokemonRequest = pokemonId => {
    return fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    }).then(resp => resp.json());
};

const addPokemonRequest = trainerId => {
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    }).then(resp => resp.json());
};

//Render trainers sequence//////////

const renderAllTrainers = allTrainers => {
    allTrainers.map(trainer => renderTrainer(trainer));
};

const renderTrainer = trainer => {
    const trainersContainer = document.querySelector("main");

    if (!trainer.error) {
        const div = renderTrainerCard(trainer);
        trainersContainer.append(div);
    }
};

const renderTrainerCard = trainer => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const btn1 = document.createElement("button");
    const list = document.createElement("ul");

    p.innerText = trainer.name;
    btn1.innerText = "Add Pokemon";
    div.className = "card";

    trainer.pokemons.map(pokemon => {
        renderPokemonLi(pokemon, list);
    });
    btn1.addEventListener("click", () => addPokemon(trainer.id, list));

    div.append(p, btn1, list);

    return div;
};

const renderPokemonLi = (pokemon, list) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    btn.innerText = "Release";
    btn.className = "release";
    li.append(btn);
    list.append(li);

    btn.addEventListener("click", () => releasePokemon(pokemon.id, li));
};

const addPokemon = (trainerId, list) => {
    addPokemonRequest(trainerId).then(pokemon => {
        if (!pokemon.error) {
            console.log(pokemon);
            renderPokemonLi(pokemon, list);
        } else {
            alert("You can't have more than 6 pokemons");
        }
    });
};

const releasePokemon = (pokemonId, li) => {
    releasePokemonRequest(pokemonId).then(() => li.remove());
};
//Initialise the app here///////////

const init = () => {
    fetchAllTrainers();
};

document.addEventListener("DOMContentLoaded", init);









