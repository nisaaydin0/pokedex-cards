const poke_container = document.querySelector(".poke-container");
const searchBar= document.querySelector(".search");
const search_btn = document.querySelector(".searchBtn");
const search_Input = document.querySelector(".searchInput");


const pokemon_count = 151;

const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
  }


search_btn.addEventListener('click',()=>{
    searchBar.classList.toggle("active");
  })




search_Input.addEventListener('input', (e)=>{
    const searchValue = search_Input.value.toLowerCase();
    const pokemonNames = document.querySelectorAll(".poke-name");

    pokemonNames.forEach((pokemonName) =>{
       if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
        pokemonName.parentElement.parentElement.style.display= "block";
       }else{
        pokemonName.parentElement.parentElement.style.display= "none";

       }
    })

})

const fetchPokemons = async() => {
    for(i=1 ; i<pokemon_count ; i++){
        await getPokemon(i)
    }
}


const getPokemon = async(id) =>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
   
    createPokemonCard(data);
}





const createPokemonCard = (pokemon) =>{
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    const pokemonType = pokemon.types[0].type.name;

    const pokeBg = bg_color[pokemonType];
    pokemonDiv.style.backgroundColor = `${pokeBg}`;

    const pokemonDivInnerHtml = ` 
            <div class="img-container"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="first pokemon"></div>
            <div class="poke-info">
                <span class="poke-id">${pokemon.id}</span>
                <h3 class="poke-name">${pokemon.name}</h3>
                <div class="small">
                    <small class="poke-experience">
                        <i class='bx bxs-flask'> ${pokemon.base_experience}</i>
                    </small>

                    <small class="poke-weight">
                        <i class='bx bxs-flask'> ${pokemon.weight} kg </i>
                    </small>
           
                </div>
                <div class="poke-type">
                    <i class='bx bxs-color'> ${pokemonType}</i>
                </div>
            </div>
    `

pokemonDiv.innerHTML = pokemonDivInnerHtml;
poke_container.appendChild(pokemonDiv);
}






fetchPokemons();