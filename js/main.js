/**Accedo a todos los elementos html */
const nombrePokemon = document.getElementById('nombrePokemon');
const tiposPokemon = document.getElementById('tiposPokemon');
const pesoPokemon = document.getElementById('pesoPokemon');
const imagenPokemon = document.getElementById('imagenPokemon');
const alturaPokemon = document.getElementById('alturaPokemon');
const movimientosPokemon = document.getElementById('movimientosPokemon');
const estadisticasPokemon = document.getElementById('estadisticasPokemon');
const idPokemon = document.getElementById('idPokemon');

getPokemonPorId(
  1
); /**Esto es para obtener toda la informacion del pokemon que necesito
El inicial siempre sera 1 */

/**
 * Esta funcion recibe como parametro el id y llama una funcion que retorna el
 * fetch realizado a la api para encadenarlo y recibir la respuesta
 * Luego se envia a la funcion mostrarPokemon
 * @param {idHtml} id
 */
function getPokemonPorId(id) {
  apiObtenerPokemon(id).then((response) => {
    response.json().then((response) => {
      console.log(response.id);
      mostrarPokemon(response);
    });
  });
}
/**
 *El fetch de la api se modifica segun el id del pokemon que se desee obtener
 se puede llamar en cualquier parte del codigo y retorna el fetch
 * @param {idHtml} id
 * @returns
 */
function apiObtenerPokemon(id) {
  id = id.toString();
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

/**
 * La funcion de mostrar pokemon le asigna los valores de cada dato que necesitamos
 * de la respuesta de la api cada funcion obtiene el valor que necesita y todas
 * las funciones reciben como parametro la respuesta de la api
 * @param {JSON} pokemonApiResponse
 */
function mostrarPokemon(pokemonApiResponse) {
  imagenPokemon.src = getImagenPokemon(pokemonApiResponse);
  nombrePokemon.innerHTML = getNombrePokemon(pokemonApiResponse);
  tiposPokemon.innerHTML = getTiposPokemon(pokemonApiResponse);
  pesoPokemon.innerText = getPesoPokemon(pokemonApiResponse);
  alturaPokemon.innerText = getAlturaPokemon(pokemonApiResponse);
  movimientosPokemon.innerHTML = getMovimientosPokemon(pokemonApiResponse);
  estadisticasPokemon.innerHTML = getEstadisticasPokemon(pokemonApiResponse);
  idPokemon.innerHTML = getIdPokemon(pokemonApiResponse);
}
/**Recibimos la respuesta de la api y retornamos la respuesta para su id*/
function getIdPokemon(pokemonApiResponse) {
  return pokemonApiResponse.id;
}
/**Retornamos el nombre */
function getNombrePokemon(pokemonApiResponse) {
  return pokemonApiResponse.name;
}
/**Esta funcion primero toma el arreglo de objetos 'types'. Luego con la funcion
 * map() de los arreglos retornamos un arreglo con el nombre del tipo
 * tambien a una variable se le va concatenando un span con el valor del tipo de
 * pokemon al pokemon que recibimos de la api y la funcion retorna eso para asignarlo
 * en el html
 */
function getTiposPokemon(pokemonApiResponse) {
  arrayTipos = pokemonApiResponse.types;
  let tiposSpans = '';
  arrayTipos = arrayTipos.map(function (tipo) {
    tiposSpans += `<span>${tipo.type.name}</span>`;
    return tipo.type.name;
  });
  console.log(arrayTipos);
  return tiposSpans;
}
/**Obtenemos la url de la imagen del pokemon */
function getImagenPokemon(pokemonApiResponse) {
  return pokemonApiResponse.sprites.other['official-artwork'].front_default;
}
/**Retorna el peso */
function getPesoPokemon(pokemonApiResponse) {
  return pokemonApiResponse.weight;
}
/**Retorna la altura */
function getAlturaPokemon(pokemonApiResponse) {
  return pokemonApiResponse.height;
}
/**NAqui asignamos a una variable el array de objetos de tipo move
 * creamos la variable a agregar en la seccion del html y recorremos el arry
 * con la funcion map concatenamos el nombre del movimiento y retornamos la varible
 */
function getMovimientosPokemon(pokemonApiResponse) {
  arrayMovimientos = pokemonApiResponse.moves;
  let movimientosSpan = '';
  arrayMovimientos = arrayMovimientos.map(function (movimiento) {
    movimientosSpan += `<span>${movimiento.move.name}</span>`;
    return movimiento.move.name;
  });
  return movimientosSpan;
}

/**Obtenemos el array de la api response de las stats luego hacemos un primer map
 * este map es para crear un array con objetos estadistica con solo el valo de su
 * base stat y su nombre creamos un objeto por cada estadistica
 * Luego recorrecomos este arreglo y creamos una etiqueta span que se concatena
 * a la variable que retornamos al final de la funionc
 */
function getEstadisticasPokemon(pokemonApiResponse) {
  arrayEstadisticas = pokemonApiResponse.stats;
  arrayEstadisticas = arrayEstadisticas.map((estadistica) => {
    return { valorBase: estadistica.base_stat, nombre: estadistica.stat.name };
  });
  let estadisticasSpans = '';
  arrayEstadisticas.forEach((estadistica) => {
    estadisticasSpans += `<span>${estadistica.nombre}: ${estadistica.valorBase}</span>`;
  });
  return estadisticasSpans;
}

/**llama la funcion y parsea el id para hacer una suma y pasar al siguiente pokemon */
const botonSiguiente = document.getElementById('botonSiguiente');
botonSiguiente.addEventListener('click', function () {
  let siguientePokemon = parseInt(idPokemon.innerText);
  siguientePokemon++;
  getPokemonPorId(siguientePokemon);
});

/**Parseamos y restamos 1 al id y luego pasamos al pokemon anterior */
const botonAnterior = document.getElementById('botonAnterior');
botonAnterior.addEventListener('click', function () {
  if (idPokemon.innerText <= 1) {
    return;
  }
  let pokemonAnterior = parseInt(idPokemon.innerText);
  pokemonAnterior--;
  getPokemonPorId(pokemonAnterior);
});
