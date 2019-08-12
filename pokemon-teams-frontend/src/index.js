const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//Api Calls
//Step 1 
// fetching the data from the Api. 

const fetchAllTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(allTrainers => renderAllTrainers(allTrainers)); 
    // This function fetches all the data based on the api
    // calling renderAllTrainers passing it the allTrainers argument
    // step 2 create the predefine function renderAllTrainers

};

//Step 9 the api call to add a pokemon

const addPokemonToTrainer = trainerId => { //the trainer Id is picked up from step 8, the name is invented in step 8 
    //but it needs to pass on to the next function for it to work.
    return fetch(POKEMONS_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({trainer_id: trainerId })
    }).then(resp => resp.json())
}

//Step 14 adding the release pokemon section
const releasePokemonRequest = pokemonId => {
    return fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    }).then(resp => resp.json());
};


//Step 2 create the predefine function renderAllTrainers

const renderAllTrainers = (allTrainers) => { // created the previously defined function 
    allTrainers.map(trainer => { // created a new anynomous function 
        renderTrainer(trainer) // creates a new function that we need to define now passing the trainer argument.
    });
};

//Step 3 creating the previously defined function following the bread crumbs

// const renderTrainer(trainer) = can I do it like this don't know 

function renderTrainer(trainer) { // this will select the section of the HTML where the trainerContainer will live
    const trainerContainer = document.querySelector("main") 
 // now we need to create the DOM Manipulation aka the trainer card once that is done we can append it to the trainerCointainer
 const cardDiv = renderTrainerCard(trainer)
 trainerContainer.append(cardDiv); //we append the trainer card with the trainer instance as an argument.

};


//Step 4 create dom manipulation function
const renderTrainerCard = trainer => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const btn1 = document.createElement("button");
    const list = document.createElement("ul");

    p.innerText = trainer.name;
    btn1.innerText = "Add Pokemon";
    div.className = "card";
//Step 6 add pokemon that belong to each user. Remeber the relationship is already set up in Rails.

    trainer.pokemons.map(pokemon => {
        renderPokemonLi(pokemon, list);
    });
    
        
    //step 7 create the event listner for the pokemon li 
    btn1.addEventListener("click", () => addPokemon(trainer.id, list));

    div.append(p, btn1, list);

    return div;
};

////Step 11 render the pokemon li so the page does not need to refresh we call this function here but need to define it in step 12
// renderPokemonLi(pokemon, list) moved the previous code from render trainer

const renderPokemonLi = (pokemon, list) => {

    const li = document.createElement('li') // creating a li to put each pokemon in 
    const btn2 = document.createElement('button')


    btn2.innerText = "Release";
    btn2.className = "release"
    li.innerText = `${pokemon.nickname}(${pokemon.species})` // the inner text for each li
    li.append(btn2);
    list.append(li);
    btn2.addEventListener("click", () => releasePokemon(pokemon.id, li))
};



//step 10 need to add a new pokemon now this will require another fetch that would be a post request do to it sending this data back to the db and storing it.
const addPokemon = (trainerId, list) => {
    addPokemonToTrainer(trainerId).then(pokemon =>
        renderPokemonLi(pokemon, list) //Step 13 this line is added to re render the page.
        );
};

const releasePokemon = (pokemonId, li) => {
    releasePokemonRequest(pokemonId).then(() => li.remove());
};
 
//Step 5 don't forget very important if not you won't see jack shit on index.html
//This initializes the app, think of it as a initializer in ruby
const init = () => {
    fetchAllTrainers();
};

document.addEventListener("DOMContentLoaded", init);




