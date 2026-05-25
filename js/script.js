const visorfruta1 = document.getElementById("visorfruta1");
const visorfruta2 = document.getElementById("visorfruta2");
const visorfruta3 = document.getElementById("visorfruta3");

const saldo = document.getElementById("saldo");
const apuesta = document.getElementById("apuesta");

const btnjugar = document.getElementById("btnjugar");
const visor__fruta = document.querySelectorAll(".visor__fruta");

const jugadas = document.getElementById("jugadas");
const cajaalerta = document.getElementById("cajaalerta");

const frutas = [
  "cereza.png",
  "dolar.png",
  "fresa.png",
  "limon.png",
  "manzana.png",
  "naranja.png",
  "piña.png",
  "platano.png",
  "sandia.png",
];
//variables
const visores = ["visorfruta1", "visorfruta2", "visorfruta3"];
var apuestaNum = 0;
var apuestaGanadora = false;
var partida = true;
var contador = 0;

//cambiar el src de la iamgen
const cambiarSrcImagen = (visor) => {
  numRand = Math.floor(Math.random() * frutas.length);
  visor.src = "./assets/images/" + frutas[numRand];
}


//que las imagenes roten
const cambiarImagenesTimers = (visor, timer) => {
  //la imagen rota cada 0,2s
  const intervalId = setInterval(() => {
    cambiarSrcImagen(visor);
  }, 100);
  //lo paramos a los segundos que queramos
  setTimeout(() => {
    clearInterval(intervalId);
  }, timer * 1000);

}

//que cambie el valor del saldo
const comprobarResultado = () => {
  const srcVisor1 = visorfruta1.src.split("/").pop();
  const srcVisor2 = visorfruta2.src.split("/").pop();
  const srcVisor3 = visorfruta3.src.split("/").pop();

  if (srcVisor1 === srcVisor2 && srcVisor2 === srcVisor3) {
    // 3 iguales
    saldo.value = parseInt(saldo.value) + (apuestaNum * 3);
    apuestaGanadora = true;
  } else if (
    srcVisor1 === srcVisor2 ||
    srcVisor1 === srcVisor3 ||
    srcVisor2 === srcVisor3
  ) {
    // 2 iguales
    saldo.value = parseInt(saldo.value) + (apuestaNum * 2);
    apuestaGanadora = true;
  } else { apuestaGanadora = false }
}

//mostrar o no el mensaje de error
const errorJuego = (mensaje) => {
  cajaalerta.textContent = mensaje;
  cajaalerta.style.display = "block";
}

//llamar a rotar las 3 imagenes
const rotarImagenes = () => {
  cambiarImagenesTimers(visorfruta1, 2);
  cambiarImagenesTimers(visorfruta2, 3);
  cambiarImagenesTimers(visorfruta3, 4);
}
//comprobar si hay suficiente saldo, que la apuesta sea >10 y si tengo menos de 10
const hacerComprobaciones = (apuestaNum) => {
  let jugar =true;
  if (parseInt(saldo.value) < 10) {
    errorJuego("No tienes dinero. Juego finalizado");
    btnjugar.innerHTML = "NUEVO JUEGO";
    jugar = false;
    partida = false
  } else if (apuestaNum < 10) {
    errorJuego("La apuesta debe ser mayor o igual a 10");
    jugar = false;
  }else if (apuestaNum > parseInt(saldo.value)) {
    errorJuego("No tienes suficiente dinero para apostar");
    jugar = false;
 
}
 return jugar;
}
//hacer el appendchild de la derecha
const incluirResultado = (apuestaNum) => {
  
  //si hay mas de 8 reiniciamos
  if(contador < 8){
    contador++;
    console.log(contador);
  }else {
    jugadas.innerHTML = "";
    contador = 1;
  }


  const article = document.createElement("article");
  article.classList.add("jugada");
  if (apuestaGanadora) {
    article.classList.add("jugada__ganadora");
  }
  else { article.classList.add("jugada__perdedora") }
  //resultado
  const divResultado = document.createElement("div");
  const pResultado = document.createElement("p");
  pResultado.classList.add("jugada__text");
  pResultado.textContent = "Resultado: ";
  const spanResultado = document.createElement("span");
  spanResultado.classList.add("jugada__text");
  spanResultado.textContent = apuestaNum;
  divResultado.appendChild(pResultado);
  divResultado.appendChild(spanResultado);
  article.appendChild(divResultado);

  //sald
  const divSaldo = document.createElement("div");
  const pSaldo = document.createElement("p");
  pSaldo.classList.add("jugada__text");
  pSaldo.textContent = "Saldo: ";
  const spanSaldo = document.createElement("span");
  spanSaldo.classList.add("jugada__text");
  spanSaldo.textContent = saldo.value;
  divSaldo.appendChild(pSaldo);
  divSaldo.appendChild(spanSaldo);
  article.appendChild(divSaldo);
  //imagenes
  const divImgs = document.createElement("div");
  const img1 = document.createElement("img");
  img1.src = visorfruta1.src;
  img1.classList.add("jugada__img")
  const img2 = document.createElement("img");
  img2.src = visorfruta2.src;
  img2.classList.add("jugada__img")
  const img3 = document.createElement("img");
  img3.classList.add("jugada__img")
  img3.src = visorfruta3.src;
  divImgs.appendChild(img1);
  divImgs.appendChild(img2);
  divImgs.appendChild(img3);
  article.appendChild(divImgs);

  jugadas.appendChild(article);
}



//reiniciar en caso de saldo <10
const reiniciarPartida = () =>{
  saldo.value = 100;
  apuesta.value = 10;
  jugadas.innerHTML = "";
  btnjugar.innerHTML = "JUGAR";
  partida = true;
  cajaalerta.style.display = "none";
}


//el juego en si
const juego = () => {
  //recojo la apuesta
  apuestaNum = parseInt(apuesta.value);
  //hago comprobaciones
  if (hacerComprobaciones(apuestaNum)) {
    btnjugar.disabled = true;
    btnjugar.classList.add("btnjugar--disabled");
    //escondo el mensaje de error si esta
    btnjugar.innerHTML = "JUGAR";
    cajaalerta.style.display = "none";
    //quito el saldo que ha apostado
    saldo.value = parseInt(saldo.value) - apuestaNum;
    //roto imagenes
    rotarImagenes();
    //cuando han parado las imagenes compruebo el resultado y hago el appendchild
    setTimeout(() => {
      comprobarResultado();
      incluirResultado(apuestaNum);
       btnjugar.disabled = false;
       btnjugar.classList.remove("btnjugar--disabled");
    }, 4030);

  
  }
}


btnjugar.addEventListener("click", () => {
  if (partida){
  juego();
  } else{
    reiniciarPartida();
  }
});
