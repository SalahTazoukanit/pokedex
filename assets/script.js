
let pokemon;
async function getPokedex(){
// pokemon;
let response = await fetch("pokemon.json-master/pokedex.json");
let data = await response.json();
pokemon = data.slice(0,800) // method pour choisir un interval ;
console.log(pokemon);
genereteCards(pokemon)
return pokemon;
}
getPokedex()

//function pour generer les cards en recuperant la liste des pokemons dans la function getPokedex.
function genereteCards(pokemonList){
    
    const pokedex = document.querySelector("#pokedex");
    pokedex.innerHTML=""
    //affichage des cards
    pokemonList.forEach(pokemon => {
        const card = `
            <div class="card">
                <img src="pokemon.json-master/images/${formatID(pokemon.id)}.png">
                <h2>${pokemon.name.french}</h2>
                <div class="infos"> 
                    <p>Vie: ${pokemon.base.HP} HP</p> 
                    <p>Attack: ${pokemon.base.Attack} </p> 
                    <p>Defense: ${pokemon.base.Defense} </p> 
                    <p>Speed: ${pokemon.base.Speed} </p> 
                </div>
            </div>
        `
        pokedex.insertAdjacentHTML("beforeend",card); 
    });
    
}

// function formatID pour lier les images qui ont ex. id=001 à l'id de notre array pokemon.
function formatID(id){
    // console.log(id.toString().length);
    if (id.toString().length == 1) {
        return ("00"+id);
    }else if(id.toString().length==2){
        return ("0"+id);
    }else if(id.toString().length==3){
        return id ;
    }
}

//function pour aller chercher le pokemon selon son type ou son nom
const searchBar = document.querySelector(".searchBar") ; 
searchBar.addEventListener("keyup", function searchPokemon(){
    if(searchBar.value.startsWith("type:")){
        console.log("je cherche par type");
    }else{
        
        //copie de l'array pokemon et filtration de l'array copié
        const pokemonFiltered = pokemon.filter(pkmn => {
            return pkmn.name.french.startsWith(searchBar.value)
        })
        genereteCards(pokemonFiltered);
    }
})




