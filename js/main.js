/**Accedo a todos los elementos html */
const nombrePokemon = document.getElementById('nombrePokemon');
const tiposPokemon = document.getElementById('tiposPokemon');
const pesoPokemon = document.getElementById('pesoPokemon');
const imagenPokemon = document.getElementById('imagenPokemon');
const alturaPokemon = document.getElementById('alturaPokemon');
const divMovimientos = document.getElementById('divMovimientos');
const divEstadisticas = document.getElementById('divEstadisticas');
const idPokemon = document.getElementById('idPokemon');
const pagina_pokemon_info = document.getElementById('pagina_pokemon_info');

/**Objeto para asigna gradiente segun el tipo de pokemon */
const coloresPokemon = {
  normal: 'linear-gradient(to bottom, #D3D3D3, #FFFFFF)',
  fighting: 'linear-gradient(to bottom, #A52A2A, #FF0000)',
  flying: 'linear-gradient(to bottom, #87CEEB, #4169E1)',
  poison: 'linear-gradient(to bottom, #800080, #EE82EE)',
  ground: 'linear-gradient(to bottom, #D2B48C, #8B4513)',
  rock: 'linear-gradient(to bottom, #A9A9A9, #696969)',
  bug: 'linear-gradient(to bottom, #556B2F, #8FBC8F)',
  ghost: 'linear-gradient(to bottom, #4B0082, #800080)',
  steel: 'linear-gradient(to bottom, #708090, #A9A9A9)',
  fire: 'linear-gradient(to bottom, #FF4500, #FFA500)',
  water: 'linear-gradient(to bottom, #1E90FF, #00BFFF)',
  grass: 'linear-gradient(to bottom, #006400, #32CD32)',
  electric: 'linear-gradient(to bottom, #FFD700, #FFA500)',
  psychic: 'linear-gradient(to bottom, #9932CC, #FF00FF)',
  ice: 'linear-gradient(to bottom, #87CEEB, #00BFFF)',
  dragon: 'linear-gradient(to bottom, #8A2BE2, #4B0082)',
  dark: 'linear-gradient(to bottom, #2F4F4F, #000000)',
  fairy: 'linear-gradient(to bottom, #FF69B4, #FF1493)',
  unknown: 'linear-gradient(to bottom, #808080, #FFFFFF)',
  shadow: 'linear-gradient(to bottom, #000000, #4B0082)',
};

/**Con esta funcion se puede cambiar el id del pokemon que se desea obtener */
getPokemonPorId(1);
function getPokemonPorId(id) {
  apiObtenerPokemon(id).then((response) => {
    response.json().then((response) => {
      console.log(response.id);
      mostrarPokemon(response);
    });
  });
}

/**En esta funcion se convierte a string por si se pasa un dato de tipo number
 * Esta retorna el fetch para obtener pokemon
 */
function apiObtenerPokemon(id) {
  id = id.toString();
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

/**Esta funcion asigna a los elementos html el valor de cada funcion en el codigo */
function mostrarPokemon(pokemonApiResponse) {
  imagenPokemon.src = getImagenPokemon(pokemonApiResponse);
  nombrePokemon.innerHTML = getNombrePokemon(pokemonApiResponse);
  tiposPokemon.innerHTML = getTiposPokemon(pokemonApiResponse);
  pesoPokemon.innerText = getPesoPokemon(pokemonApiResponse);
  alturaPokemon.innerText = getAlturaPokemon(pokemonApiResponse);
  mostrarMovimientos(pokemonApiResponse);
  mostrarEstadisticas(pokemonApiResponse);
  idPokemon.innerHTML = getIdPokemon(pokemonApiResponse);
  cambiaTema(pokemonApiResponse);
}
function getIdPokemon(pokemonApiResponse) {
  return pokemonApiResponse.id;
}
function getNombrePokemon(pokemonApiResponse) {
  return pokemonApiResponse.name;
}
function getTiposPokemon(pokemonApiResponse) {
  arrayTipos = pokemonApiResponse.types;
  let tiposSpans = '';
  //Se recorre el array de tipos con map function y esto va creando elementos span
  //Al final la funcion retorna la variable no el arreglo se podria hacer tambien con foreach
  //aqui el map tambien sustituye el valor original del arreglo
  arrayTipos = arrayTipos.map(function (tipo) {
    tiposSpans += `<span>${tipo.type.name}</span>`;
    return tipo.type.name;
  });
  return tiposSpans;
}

function getImagenPokemon(pokemonApiResponse) {
  return pokemonApiResponse.sprites.other['official-artwork'].front_default;
}

function getPesoPokemon(pokemonApiResponse) {
  return pokemonApiResponse.weight;
}
function getAlturaPokemon(pokemonApiResponse) {
  return pokemonApiResponse.height;
}
/**Esto retorna el arrayMovimientos usando la funcion map */
function getMovimientosPokemon(pokemonApiResponse) {
  arrayMovimientos = pokemonApiResponse.moves;
  arrayMovimientos = arrayMovimientos.map(function (movimiento) {
    return movimiento.move.name;
  });
  return arrayMovimientos;
}

/**Mostramos los movimientos obtenidos con la funcion esta vez se utliza un foreacj
 * y se limpia el contenido de adentro
 */
function mostrarMovimientos(pokemonApiResponse) {
  divMovimientos.innerHTML = '';
  let arrayMovimientos = getMovimientosPokemon(pokemonApiResponse);
  arrayMovimientos.forEach((movimiento) => {
    let span = document.createElement('span');
    span.append(movimiento);
    divMovimientos.append(span);
  });
}
/**En esta se usa el map para retornar la estadistica en un arreglo solo con lo que se necesita */
function getEstadisticasPokemon(pokemonApiResponse) {
  arrayEstadisticas = pokemonApiResponse.stats;
  arrayEstadisticas = arrayEstadisticas.map((estadistica) => {
    return { valorBase: estadistica.base_stat, nombre: estadistica.stat.name };
  });
  return arrayEstadisticas;
}
/**Mostramos las estadisticas creando el elemento html pareciod a la funcion de mostrarMovimientos */
function mostrarEstadisticas(pokemonApiResponse) {
  divEstadisticas.innerHTML = '';
  let arrayEstadisticas = getEstadisticasPokemon(pokemonApiResponse);
  arrayEstadisticas.forEach((estadistica) => {
    let span = document.createElement('span');
    span.append(`${estadistica.nombre}: ${estadistica.valorBase}`);
    divEstadisticas.append(span);
  });
}
/**Esto nos retorna el primer tipo de Pokemon */
function getTipoPrincipal(pokemonApiResponse) {
  let tipo = pokemonApiResponse.types[0].type.name;
  return tipo;
}
/**Cambiamos el tipo de color en base al tipo retornado */
function cambiaTema(pokemonApiResponse) {
  let tipo = getTipoPrincipal(pokemonApiResponse);
  console.log(tipo);
  pagina_pokemon_info.style.background = coloresPokemon[tipo];
}

const botonSiguiente = document.getElementById('botonSiguiente');
botonSiguiente.addEventListener('click', function () {
  let siguientePokemon = parseInt(idPokemon.innerText);
  siguientePokemon++;
  getPokemonPorId(siguientePokemon);
});

const botonAnterior = document.getElementById('botonAnterior');
botonAnterior.addEventListener('click', function () {
  if (idPokemon.innerText <= 1) {
    return;
  }
  let pokemonAnterior = parseInt(idPokemon.innerText);
  pokemonAnterior--;
  getPokemonPorId(pokemonAnterior);
});
